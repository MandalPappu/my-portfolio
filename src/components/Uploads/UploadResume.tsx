import axios from "axios";
import { Loader2Icon, Upload } from "lucide-react";
import React, { MouseEvent, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

const UploadResume = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null)
  
      const onSubmitResumeHandler = async (
        e: MouseEvent<HTMLButtonElement>
      ) => {
        e.preventDefault();
        try {
          setLoading(true)
          if (!resumeFile) return;
          const formData = new FormData();
          formData.append("resume", resumeFile);
          const res = await axios
            .post("/api/resume/add", formData)
            .then((res) => res.data.message)
            .catch((res) => res.response.data.message);
          console.log(res);

          toast(res, { position: "top-center", autoClose: 2000 });
          setLoading(false)
          setResumeFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error: any) {
          setLoading(false)
          setResumeFile(null)
          toast(error.response.data.message);
          if (fileInputRef.current) fileInputRef.current.value = "";
          process.exit(1);
        }
      };
    useEffect(() => {
      if (resumeFile) {
        setButtonDisabled(false);
      }
      return ()=>setButtonDisabled(true)
    }, [resumeFile]);
    return (
      <div className="flex w-80 mx-auto sm:mx-4 flex-col my-4 sm:text-start">
        <h1 className="text-2xl font-semibold my-2">uploads yours resume...</h1>
        <form className="w-full flex items-center relative">
          <label htmlFor="fileInput">
              <Upload size={30} className="mx-auto bg-black absolute w-[105px] h-9 top-6 -left-1" />
          </label>
          <input
            ref={fileInputRef}
            id="fileInput"
            required={true}
            type="file"
            onChange={(e) =>
              setResumeFile(e.target.files ? e.target.files[0] : null)
            }
            className="w-60 py-4 cursor-pointer my-2"
          />
        </form>
        <button
          onClick={onSubmitResumeHandler}
          disabled={buttonDisabled}
          className={`w-[10rem] mx-auto sm:mx-0 my-4 hover:opacity-50 flex justify-center items-center gap-1 transition-colors sm:w-32 py-2 px-4 font-semibold text-base text-black rounded-xl cursor-pointer bg-green-500 ${
            buttonDisabled ? "opacity-30" : ""
          } `}
        >
          {!buttonDisabled && loading ? (
            <div className="flex items-center gap-2">
              <Loader2Icon size={20} className="animate-spin" />
              <h2>uploading...</h2>
            </div>
          ) : (
            "upload"
          )}
        </button>
      </div>
      // <div className="flex w-80 mx-auto sm:mx-4 flex-col my-4 sm:text-start">
      //   <h1 className="text-2xl font-semibold my-2">uploads yours projects...</h1>
      //   <form className="w-full flex items-center">
      //     <input
      //       type="text"
      //       placeholder="skill name's..."
      //       required={true}
      //       value={skillName}
      //       onChange={(e) => setSkillName(e.target.value)}
      //       className="px-2 md:w-56 py-1 rounded-[6px] my-2 bg-slate-500/15 outline-none text-xl placeholder:text-base"
      //     />
      //     <input
      //       ref={fileInputRef}
      //       type="file"
      //       required={true}
      //       onChange={(e) =>
      //         setSkillImage(e.target.files ? e.target?.files[0] : null)
      //       }
      //       className="w-16 py-4 opacity-0 cursor-pointer absolute right-3 my-2"
      //     />
      //     <div className="w-16 text-center cursor-pointer relative">
      //       <Upload size={30} className="mx-auto" />
      //       <span className="text-[8px] absolute top-8 left-3">choose files</span>
      //     </div>
      //   </form>
      //   <button
      //     onClick={onSubmitSkillHandler}
      //     disabled={buttonDisabled}
      //     className={`w-[10rem] mx-auto sm:mx-0 my-4 hover:opacity-50 flex justify-center items-center gap-1 transition-colors sm:w-32 py-2 px-4 font-semibold text-base text-black rounded-xl cursor-pointer bg-green-500 ${
      //       buttonDisabled ? "opacity-30" : ""
      //     } `}
      //   >
      //     {loading ? (
      //       <div className="flex items-center gap-2">
      //         <Loader2Icon size={20} className="animate-spin" />
      //         <h2>uploading...</h2>
      //       </div>
      //     ) : (
      //       "upload"
      //     )}
      //   </button>
      // </div>
    );
};

export default UploadResume;
