import { Webhook } from "svix";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { env } from "@/env";
import { db } from "@/server/db";
import { users } from "@/server/db/schema/users";
import { eq } from "drizzle-orm";
import type { WebhookEvent } from "@clerk/nextjs/server";

type UserWebhookEvent = Extract<
  WebhookEvent,
  { type: "user.created" | "user.updated" | "user.deleted" }
>;

type ExtractUserJSON<T> = T extends { data: infer P } ? P : never;

type UserJSON = ExtractUserJSON<
  Extract<WebhookEvent, { type: "user.created" | "user.updated" }>
>;

function getPrimaryEmail(data: UserJSON) {
  const email = data.email_addresses.find(
    (e) => e.id === data.primary_email_address_id,
  )?.email_address;
  return email ?? data.email_addresses[0]?.email_address;
}

export async function POST(req: NextRequest) {
  // eslint-disable-next-line
  const payload = await req.json();
  const payloadString = JSON.stringify(payload);
  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id");
  const svixIdTimeStamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    console.log("Webhook headers failed");
    return Response.json({
      status: "Unauthorized Signature",
      code: 401,
    });
  }

  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixIdTimeStamp,
    "svix-signature": svixSignature,
  };

  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET ?? "");
  let event: UserWebhookEvent | null = null;
  let primaryEmail: string | undefined;

  try {
    event = wh.verify(payloadString, svixHeaders) as UserWebhookEvent;
  } catch {
    console.log("Webhook verification failed");
    return Response.json({
      status: "Unauthorized Payload",
      code: 401,
    });
  }

  console.log(event);

  switch (event.type) {
    case "user.created":
      console.log("User created");

      primaryEmail = getPrimaryEmail(event.data);
      if (primaryEmail === undefined) {
        return Response.json({
          status: "Email Error",
          code: 400,
        });
      }

      await db.insert(users).values({
        id: event.data.id,
        createdAt: new Date(event.data.created_at),
        updatedAt: new Date(event.data.updated_at),
        firstName: event.data.first_name,
        lastName: event.data.last_name,
        email: primaryEmail,
        image: event.data.image_url,
      });

      return Response.json({
        status: "OK",
        code: 200,
      });

    case "user.updated":
      console.log("User updated");

      primaryEmail = getPrimaryEmail(event.data);
      if (primaryEmail === undefined) {
        return Response.json({
          status: "Email Error",
          code: 400,
        });
      }

      // TODO: Check if user exists

      await db
        .update(users)
        .set({
          id: event.data.id,
          createdAt: new Date(event.data.created_at),
          updatedAt: new Date(event.data.updated_at),
          firstName: event.data.first_name,
          lastName: event.data.last_name,
          email: primaryEmail,
          image: event.data.image_url,
        })
        .where(eq(users.id, event.data.id));

      return Response.json({
        status: "OK",
        code: 200,
      });

    case "user.deleted":
      console.log("User deleted");

      if (event.data.deleted && event.data.id) {
        await db
          .update(users)
          .set({
            softDelete: true,
          })
          .where(eq(users.id, event.data.id));

        return Response.json({
          status: "OK",
          code: 200,
        });
      } else {
        return Response.json({
          status: "Soft Delete Error",
          code: 400,
        });
      }

    default:
      console.log("Unsupported event");
      return Response.json({
        status: "Unsupported Event",
        code: 400,
      });
  }
}
