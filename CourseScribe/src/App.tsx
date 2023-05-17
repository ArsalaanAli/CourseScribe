import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [inputFile, setInputFile] = useState();

  const callBackend = async (file: any) => {
    const formData = new FormData();

    console.log(file);
    formData.append("file", file);
    formData.append("description", "heres a desc of the video");
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    const resp = await fetch("http://localhost:5000/upload", requestOptions);

    const body = await resp.text();

    console.log(body);
  };

  const callTest = async () => {
    const resp = await fetch("http://localhost:5000/test");

    const body = await resp.text();

    console.log(body);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <input
        type="file"
        name="userVideo"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setInputFile(e.target.files[0]);
        }}
      />
      <button onClick={(e: any) => callBackend(inputFile)}>Submit</button>
      <button onClick={(e: any) => callTest()}>Test</button>
    </>
  );
}

export default App;
