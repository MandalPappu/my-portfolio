import axios from "axios";
import React, { MouseEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UploadProjects = () => {
      const [projectName, setProjectName] = useState("");
      const [projectImage, setProjectImage] = useState<File | null>(null);
      const [buttonDisabled, setButtonDisabled] = useState(true);
      const [loading, setLoading] = useState(false);
  
      const onSubmitProjectHandler = async (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
          setLoading(true)
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
          setLoading(false)
        } catch (error:any) {
          console.log(error);
          toast(error.response.data.message)
        }
  };
  
  useEffect(() => {
    if (
      !projectName.trim() || !projectImage
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
            type="file"
            onChange={(e) =>setProjectImage(e.target.files ? e.target.files[0] : null)}
            className=" px-2 py-1 rounded-2xl my-2"
          />
          <button
            onClick={onSubmitProjectHandler}
            className={`my-2 hover:opacity-50 transition-colors sm:w-28 py-2 px-4 font-semibold text-base text-black rounded-xl cursor-pointer bg-green-500 ${
              buttonDisabled ? "opacity-30" : ""
            } `}
          >
            {loading ? "uploading..." : "upload"}
          </button>
        </form>
      </div>
    );
};

export default UploadProjects;
