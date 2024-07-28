import axios from "axios";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UploadResume = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  
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
        } catch (error: any) {
          setLoading(false)
          setResumeFile(null)
          toast(error.response.data.message);
        }
      };
    useEffect(() => {
      if ({resume:null}) {
        setButtonDisabled(true);
      }
    }, [resumeFile]);
    return (
      <div className="flex w-80 mx-auto sm:mx-0 flex-col my-4 text-center sm:text-start">
        <h1 className="text-2xl font-semibold my-2">uploads yours resume...</h1>
        <form className="w-60 mx-auto sm:mx-0">
          <input
            type="file"
            onChange={(e) =>
              setResumeFile(e.target.files ? e.target.files[0] : null)
            }
            className=" px-2 py-1 rounded-2xl my-2"
          />
          <button
            onClick={onSubmitResumeHandler}
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

export default UploadResume;
