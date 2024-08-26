import axios from "axios";
import React, { MouseEvent, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Loader2Icon, Upload } from "lucide-react";

const UploadProjects = () => {
      const [projectName, setProjectName] = useState("");
      const [projectLink, setProjectLink] = useState("");
      const [projectImage, setProjectImage] = useState<FileList | null>(null);
      const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
      const onSubmitProjectHandler = async (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
          setLoading(true)
          if (!projectImage?.item || !projectName) return ;
          const formData = new FormData();
          for (let i = 0; i < projectImage.length; i++) {
            formData.append("projectImage", projectImage[i]);
          }
          formData.append("projectName", projectName.trim());
          formData.append("projectLink", projectLink);
          const res = await axios.postForm("/api/project/add", formData)
            .then((res) => res.data.message)
            .catch((res)=>res.response.data.message)
                toast(res, { position: "top-center", autoClose: 2000 });
                setProjectName("");
                setProjectLink("");
          setProjectImage(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          setLoading(false)
        } catch (error:any) {
          console.log(error);
          toast(error.response.data.message)
          setProjectName("");
          setProjectLink("");
          setProjectImage(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
  };
  
  useEffect(() => {
    if (
      projectImage && projectName.trim()
    ) {
      setButtonDisabled(false);
    } else { setButtonDisabled(true) };
    
    return () => setButtonDisabled(true);
  }, [projectImage, projectName]);
  return (
    <div className="flex w-80 mx-auto sm:mx-4 flex-col my-4 sm:text-start">
      <h1 className="text-2xl font-semibold my-2">uploads yours projects...</h1>
      <form className="w-full flex flex-col relative">
        <input
          type="text"
          placeholder="project name's..."
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-[78%] px-2 md:w-56 block py-1 rounded-[6px] my-2 bg-slate-500/15 outline-none text-xl placeholder:text-base"
        />
        <input
          type="text"
          placeholder="project links..."
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
          className="w-[78%] px-2 block md:w-56 py-1 rounded-[6px] my-2 bg-slate-500/15 outline-none text-xl placeholder:text-base"
        />
        <label htmlFor="projectFile">
          <Upload
            size={30}
            className="mx-auto bg-black absolute w-[113px] h-9 bottom-8 -left-1"
          />
        </label>
        <input
          ref={fileInputRef}
          id="projectFile"
          type="file"
          multiple={true}
          onChange={(e) => setProjectImage(e.target?.files)}
          className="w-60 py-4 cursor-pointer right-0 my-5"
        />
      </form>
      <button
        onClick={onSubmitProjectHandler}
        disabled={buttonDisabled}
        className={`w-[10rem] mx-auto sm:mx-0 mb-4 hover:opacity-50 flex justify-center items-center gap-1 transition-colors sm:w-32 py-2 px-4 font-semibold text-base text-black rounded-xl cursor-pointer bg-green-500 ${
          buttonDisabled ? "opacity-30" : ""
        } `}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2Icon size={20} className="animate-spin" />
            <h2>uploading...</h2>
          </div>
        ) : (
          "upload"
        )}
      </button>
    </div>
  );
};

export default UploadProjects;
