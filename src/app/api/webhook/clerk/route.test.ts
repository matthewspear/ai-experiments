import { NextRequest } from "next/server";
import { Webhook } from "svix";

const { insertValues, secret } = vi.hoisted(() => ({
  insertValues: vi.fn(),
  secret: `whsec_${Buffer.from("test-signing-secret").toString("base64")}`,
}));

vi.mock("@/env", () => ({ env: { CLERK_WEBHOOK_SECRET: secret } }));
vi.mock("@/server/db", () => ({
  db: { insert: () => ({ values: insertValues }) },
}));
vi.mock("next/headers", () => ({ headers: vi.fn() }));

import { headers } from "next/headers";
import { POST } from "./route";

const userCreated = JSON.stringify({
  type: "user.created",
  data: {
    id: "user_123",
    created_at: 1_700_000_000_000,
    updated_at: 1_700_000_000_000,
    first_name: "Ada",
    last_name: "Lovelace",
    image_url: "https://example.com/ada.png",
    primary_email_address_id: "email_2",
    email_addresses: [
      { id: "email_1", email_address: "other@example.com" },
      { id: "email_2", email_address: "ada@example.com" },
    ],
  },
});

function request(body: string, signature?: string) {
  const id = "msg_123";
  const timestamp = new Date();
  const svixHeaders = new Headers({
    "svix-id": id,
    "svix-timestamp": String(Math.floor(timestamp.getTime() / 1000)),
    "svix-signature":
      signature ?? new Webhook(secret).sign(id, timestamp, body),
  });
  vi.mocked(headers).mockResolvedValue(
    svixHeaders as Awaited<ReturnType<typeof headers>>,
  );
  return new NextRequest("http://localhost/api/webhook/clerk", {
    method: "POST",
    headers: svixHeaders,
    body,
  });
}

describe("Clerk webhook", () => {
  beforeEach(() => {
    insertValues.mockReset();
  });

  it("stores a user from a correctly signed user.created event", async () => {
    const response = await POST(request(userCreated));

    expect(await response.json()).toEqual({ status: "OK", code: 200 });
    expect(insertValues).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "user_123",
        email: "ada@example.com",
        firstName: "Ada",
      }),
    );
  });

  it("rejects a payload whose signature does not match", async () => {
    const response = await POST(request(userCreated, "v1,invalid"));

    expect(await response.json()).toEqual({
      status: "Unauthorized Payload",
      code: 401,
    });
    expect(insertValues).not.toHaveBeenCalled();
  });

  it("rejects a request without svix headers", async () => {
    vi.mocked(headers).mockResolvedValue(
      new Headers() as Awaited<ReturnType<typeof headers>>,
    );
    const response = await POST(
      new NextRequest("http://localhost/api/webhook/clerk", {
        method: "POST",
        body: userCreated,
      }),
    );

    expect(await response.json()).toEqual({
      status: "Unauthorized Signature",
      code: 401,
    });
  });
});
