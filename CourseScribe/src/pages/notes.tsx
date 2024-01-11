import { getServerSession } from "next-auth/next";
import { getProviders, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import type { NextRouter } from "next/router";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next/types";
import AppHeader from "~/components/AppHeader";
import Background from "~/components/Background";
import { authOptions } from "~/server/auth";
import NoteCard, { WaitingCard } from "~/components/NoteCard";
import { Trash2 } from "lucide-react";
import { useState } from "react";

function Notes({
  notes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session, status } = useSession();
  const UserNotes: [] = notes["data"];
  const router = useRouter();
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
        {UserNotes.length === 0 ? (
          <h2 className="mt-36 text-lg font-bold text-gray-600 dark:text-white md:text-4xl">
            You don't have any notes yet!
          </h2>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="mt-20 text-lg font-bold text-gray-900 dark:text-white md:text-4xl">
              Notes
            </h2>
            <div className="mt-10 flex w-screen flex-col items-center">
              {UserNotes.reverse().map(
                (curNote: {
                  noteData: string;
                  noteId: string;
                  noteName: string;
                  userId: string;
                }) => {
                  if (curNote.noteData === "WAITING") {
                    return (
                      <div className="flex w-screen flex-row items-center justify-center">
                        <WaitingCard
                          noteData={curNote.noteData}
                          noteId={curNote.noteId}
                          noteName={curNote.noteName}
                          userId={curNote.userId}
                        />
                        <div className="mx-5" />
                      </div>
                    );
                  }
                  return (
                    <div className="flex w-screen flex-row items-center justify-center">
                      <NoteCard
                        noteData={curNote.noteData}
                        noteId={curNote.noteId}
                        noteName={curNote.noteName}
                        userId={curNote.userId}
                      />
                      <Trash2
                        className="ml-3 mt-6 cursor-pointer"
                        color="#de0937"
                        onClick={() => {
                          const userConfirmed = window.confirm(
                            "Are you sure you want to delete this note?"
                          );
                          if (userConfirmed) {
                            DeleteNote(curNote.noteId, router);
                          }
                        }}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const DeleteNote = async (noteId: string, router: NextRouter) => {
  const response = await fetch("http://localhost:3000/api/deleteNote", {
    method: "POST",
    body: JSON.stringify({ note: noteId }),
  });
  const done = response.status;
  if (done) {
    router.reload();
  }
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (!session) {
    return { redirect: { destination: "/" } };
  }

  console.log(session?.user?.id);

  const response = await fetch("http://localhost:3000/api/getNotes", {
    method: "POST",
    body: JSON.stringify({ user: session?.user?.id }),
  });

  const getnotes = await response.json();

  return {
    props: { notes: getnotes },
  };
}

export default Notes;
