import { type NextPage } from "next";

import Layout from "../components/Layout";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Profile: NextPage = () => {
  const { data: session } = useSession();
  return (
    <Layout title="Profile">
      <div className="flex w-fit flex-col gap-2">
        {session && (
          <>
            <Image
              src={session.user.image as string}
              alt="Profile picture for user"
              className="inline-block h-32 w-32 rounded-full"
              width={128}
              height={128}
            />
            <h2>{session.user.name}</h2>
            <pre className=" my-4 rounded-lg bg-white/50 p-4 backdrop-blur-md">
              {JSON.stringify(session, null, 2)}
            </pre>
            <p>Signed in as {session.user.email}</p>
            <button
              onClick={() => void signOut()}
              type="button"
              className="inline-flex w-fit items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign out
            </button>
          </>
        )}
        {!session && (
          <>
            <p>
              Not signed in <br />
            </p>
            <button
              onClick={() => void signIn("github")}
              type="button"
              className="inline-flex w-fit items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in with GitHub
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
