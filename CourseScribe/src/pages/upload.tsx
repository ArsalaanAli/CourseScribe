import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Background from "~/components/Background";

const callBackend = async (file: File, user: string, noteName: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("user", user);
  formData.append("noteName", noteName);
  formData.append("description", "video uploaded to api");
  const requestOptions = {
    method: "POST",
    body: formData,
  };
  const resp = await fetch("http://localhost:5000/upload", requestOptions);

  const body = await resp.text();

  console.log(body);
};

function Upload() {
  const { data: session } = useSession();
  const user = session?.user.id ? session.user.id : "testUserABC";

  const [file, setFile] = useState<File | null | undefined>(null);
  const [noteName, setNoteName] = useState("");
  return (
    <div className="flex flex-col justify-center">
      <Background />
      <label className="block">
        <span className="sr-only">Choose profile photo</span>
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
        className="mt-4"
        type="text"
        placeholder="Note Name"
        onChange={(e) => setNoteName(e.target.value)}
      />
      <Button
        className="mt-4 block"
        onClick={() => {
          if (file) callBackend(file, user, noteName);
        }}
      >
        Upload
      </Button>
    </div>
  );
}

export default Upload;
