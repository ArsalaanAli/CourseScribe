import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <button
        className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    );
  }
  return (
    <>
      <h1 className="text-3xl text-green-500">Logged In!</h1>
      <h1 className="text-3xl text-black">Hi there {session.user?.name}!</h1>
    </>
  );
}
