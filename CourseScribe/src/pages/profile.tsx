import { getServerSession } from "next-auth/next";
import { getProviders, signOut, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next/types";
import AppHeader from "~/components/AppHeader";
import Background from "~/components/Background";
import { authOptions } from "~/server/auth";

function Profile() {
  const { data: session, status } = useSession();
  console.log(status, session);
  const notes = [];

  return (
    <div>
      <AppHeader />
      <Background />
      <div className="relative flex h-screen flex-col items-center pt-20 ">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white md:text-6xl">
          Hi {session?.user.name?.split(" ").at(0)}
        </h1>
        <button
          className="mt-1 text-xl font-medium text-gray-600 transition-all hover:cursor-pointer hover:text-primary"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
        {notes.length === 0 ? (
          <h2 className="mt-36 text-lg font-bold text-gray-600 dark:text-white md:text-4xl">
            You don't have any notes yet!
          </h2>
        ) : (
          <h2 className="mt-36 text-lg font-bold text-gray-900 dark:text-white md:text-4xl">
            Here are your notes
          </h2>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (!session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

export default Profile;
