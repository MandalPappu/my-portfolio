import axios from "axios";
import React, { MouseEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CircleSpinner from "../CircleSpinner";

const UploadProjects = () => {
      const [projectName, setProjectName] = useState("");
      const [projectLink, setProjectLink] = useState("");
      const [projectImage, setProjectImage] = useState<FileList | null>(null);
      const [buttonDisabled, setButtonDisabled] = useState(true);
      const [loading, setLoading] = useState(false);
  
      const onSubmitProjectHandler = async (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
          setLoading(true)
          if (!projectImage?.item || !projectName) return ;
          const formData = new FormData();
          for (let i = 0; i < projectImage.length; i++) {
            formData.append("projectImage", projectImage[i]);
          }
          formData.append("projectName", projectName);
          formData.append("projectLink", projectLink);
          const res = await axios.post("/api/project/add", formData)
            .then((res) => res.data.message)
            .catch((res)=>res.response.data.message)
                toast(res, { position: "top-center", autoClose: 2000 });
                setProjectName("");
                setProjectLink("");
          setProjectImage(null);
          setLoading(false)
        } catch (error:any) {
          console.log(error);
          toast(error.response.data.message)
          setProjectName("");
          setProjectLink("");
          setProjectImage(null);
        }
  };
  
  useEffect(() => {
    if (
      !projectName.trim() || !projectImage?.item
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [projectImage, projectName]);
    return (
      <div className="flex w-80 mx-auto sm:mx-0 flex-col my-4 text-center sm:text-start">
        <h1 className="text-2xl font-semibold my-2">
          uploads yours projects...
        </h1>
        <form className="w-60 mx-auto sm:mx-0">
          <input
            type="text"
            placeholder="project name's..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="px-2 w-full md:w-56 py-1 rounded-md my-2 bg-slate-500/15 outline-none text-xl placeholder:text-base"
          />
          <input
            type="text"
            placeholder="project links..."
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
            className="px-2 w-full md:w-56 py-1 rounded-md my-2 bg-slate-500/15 outline-none text-xl placeholder:text-base"
          />
          <input
            type="file"
            multiple={true}
            onChange={(e) => setProjectImage(e.target?.files)}
            className=" px-2 py-1 rounded-2xl my-2"
          />
          <button
            onClick={onSubmitProjectHandler}
            className={`my-2 hover:opacity-50 flex justify-center items-center gap-1 transition-colors sm:w-32 py-2 px-4 font-semibold text-base text-black rounded-xl cursor-pointer bg-green-500 ${
              buttonDisabled ? "opacity-30" : ""
            } `}
          >
            {loading ? (
             <CircleSpinner/> 
            ) : (
              ""
            )}
            {loading ? "uploading..." : "upload"}
          </button>
        </form>
      </div>
    );
};

export default UploadProjects;
