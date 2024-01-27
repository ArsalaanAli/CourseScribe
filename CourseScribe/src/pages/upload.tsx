import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Background from "~/components/Background";
import AppHeader from "~/components/AppHeader";
import { useRouter } from "next/router";
import { NextRouter } from "next/router";

const callBackend = async (
  file: File,
  user: string,
  noteName: string,
  depth: number,
  router: NextRouter
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("user", user);
  formData.append("noteName", noteName);
  formData.append("depth", depth.toString());
  formData.append("description", "video uploaded to api");
  const requestOptions = {
    method: "POST",
    body: formData,
  };
  const resp = await fetch("http://localhost:5000/upload", requestOptions);
  router.reload();
};

function Upload() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user.id ? session.user.id : "testUserABC";

  const [file, setFile] = useState<File | null | undefined>(null);
  const [noteName, setNoteName] = useState("");
  const [depth, setDepth] = useState(0);
  const depthDescriptions = [
    "Short, concise, and easy to read notes that will get across the key points",
    "Notes that are as concise as possible while still being comprehensive on all key points",
    "Notes that will get across all of naunced details of the lecture, giving you a solid grasp of all talking points",
  ];
  return (
    <div>
      <AppHeader />
      <Background />
      <div className="relative flex flex-col items-center pt-60">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white md:text-6xl">
          Upload
        </h1>
      </div>
      <div className="z-50 mt-28 flex h-screen flex-col items-center">
        <label className="block">
          <span className="sr-only">Upload Video</span>
          <input
            type="file"
            className="block w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-950"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </label>
        <Input
          className="mt-4 w-1/4"
          type="text"
          placeholder="Note Name"
          onChange={(e) => setNoteName(e.target.value)}
        />
        <p className="my-5 text-lg font-medium">
          Select the level of detail in your notes:
        </p>
        <div className="mb-3 flex w-1/4 flex-row justify-between">
          <button
            className={
              "w-32 rounded-md text-lg font-medium text-white hover:bg-green-700 " +
              (depth === 0 ? "bg-green-700" : "bg-slate-900")
            }
            onClick={() => setDepth(0)}
          >
            Concise
          </button>
          <button
            className={
              "w-32 rounded-md text-lg font-medium text-white hover:bg-yellow-700 " +
              (depth === 1 ? "bg-yellow-700" : "bg-slate-900")
            }
            onClick={() => setDepth(1)}
          >
            Average
          </button>
          <button
            className={
              "w-32 rounded-md text-lg font-medium text-white hover:bg-red-700 " +
              (depth === 2 ? "bg-red-700" : "bg-slate-900")
            }
            onClick={() => setDepth(2)}
          >
            In-depth
          </button>
        </div>
        <p className="mb-5">{depthDescriptions[depth]}</p>

        <Button
          className="mt-4 block"
          onClick={async () => {
            if (file) {
              callBackend(file, user, noteName, depth, router);
              await delay(2000);
              router.push("/notes");
            }
          }}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default Upload;
