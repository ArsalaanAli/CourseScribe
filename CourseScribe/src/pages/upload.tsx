import { Button } from "@/components/ui/button";
import { useState } from "react";

const callBackend = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
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
  const [file, setFile] = useState<File | null | undefined>(null);
  return (
    <div className="flex flex-col justify-center">
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
      <Button
        className="mt-4 block"
        onClick={() => {
          if (file) callBackend(file);
        }}
      >
        Upload
      </Button>
    </div>
  );
}

export default Upload;
