import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";

const UploadProjects = () => {
      const [projectName, setProjectName] = useState("");
      const [projectImage, setProjectImage] = useState<File | null>(null);

      const onSubmitProjectHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          if (!projectImage || !projectName) return;
          const formData = new FormData();
          formData.append("projectImage", projectImage);
          formData.append("projectName", projectName);
          const res = await axios.post("api/project/add", formData);
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      };
    return (
      <div className="container flex flex-col my-4">
        <h1 className="text-2xl font-semibold my-2">
          uploads yours projects...
        </h1>
        <form onSubmit={onSubmitProjectHandler}>
          <input
            type="text"
            placeholder="project name's..."
            value={projectName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setProjectName(e.target.value);
            }}
            className="px-2 w-full md:w-56 py-1 rounded-md my-2 bg-slate-500/15 outline-none text-xl placeholder:text-base"
          />
          <input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setProjectImage(e.target.files ? e.target.files[0] : null)
            }
            className=" px-2 py-1 rounded-2xl my-2"
          />
        </form>
          <button className="w-full hover:bg-green-950 hover:text-white transition-colors md:w-28 px-6 py-2 font-semibold text-base bg-green-500 text-black rounded-lg cursor-pointer">
            upload
          </button>
      </div>
    );
};

export default UploadProjects;
