import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UploadProjects = () => {
      const [projectName, setProjectName] = useState("");
      const [projectImage, setProjectImage] = useState<File | null>(null);
      const [buttonDisabled, setButtonDisabled] = useState(true);
  
      const onSubmitProjectHandler = async () => {
        try {

          if (!projectImage || !projectName) return;
          const formData = new FormData();
          formData.append("projectImage", projectImage);
          formData.append("projectName", projectName);
          const res = await axios.post("/api/project/add", formData)
            .then((res) => res.data.message)
            .catch((res)=>res.response.data.message)
                toast(res, { position: "top-center", autoClose: 2000 });
                setProjectName("");
                setProjectImage(null);
        } catch (error:any) {
          console.log(error);
          toast(error.response.data.message)
        }
  };
  
  useEffect(() => {
    if (
      {projectImage :"",
      projectName:""}
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [projectImage, projectName]);
    return (
      <div className="container flex flex-col my-4">
        <h1 className="text-2xl font-semibold my-2">
          uploads yours projects...
        </h1>
        <form>
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
          <button
            onClick={onSubmitProjectHandler}
            className={`w-full my-3 hover:bg-green-950 hover:text-white transition-colors md:w-28 py-2 font-semibold text-base text-black rounded-lg cursor-pointer ${
              buttonDisabled ? "bg-slate-300" : "bg-green-500"
            } `}
          >
            upload
          </button>
      </div>
    );
};

export default UploadProjects;
