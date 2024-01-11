import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Background from "~/components/Background";
import AppHeader from "~/components/AppHeader";
import { useRouter } from "next/router";
import { NextRouter } from "next/router";

const callBackend = (file: File, user: string, noteName: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("user", user);
  formData.append("noteName", noteName);
  formData.append("description", "video uploaded to api");
  const requestOptions = {
    method: "POST",
    body: formData,
  };
  const resp = fetch("http://localhost:5000/upload", requestOptions);
};

function Upload() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user.id ? session.user.id : "testUserABC";

  const [file, setFile] = useState<File | null | undefined>(null);
  const [noteName, setNoteName] = useState("");
  return (
    <div>
      <AppHeader />
      <Background />
      <div className="z-50 flex h-screen flex-col items-center justify-center">
        <label className="block">
          <span className="sr-only">Upload Video</span>
          <input
            type="file"
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white  hover:file:bg-blue-600"
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
        <Button
          className="mt-4 block"
          onClick={async () => {
            if (file) {
              callBackend(file, user, noteName);
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
