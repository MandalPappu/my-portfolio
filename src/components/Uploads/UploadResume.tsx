import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UploadResume = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  
      const onSubmitResumeHandler = async () => {
        try {

          if (!resume) return;
          const formData = new FormData();
          formData.append("resume", resume);
          const res = await axios.post("/api/resume/add", formData)
            .then((res) => res.data.message)
            .catch((res) => res.response.data.message);
          console.log(res);
          
          toast(res, { position: "top-center", autoClose: 2000 })

          setResume(null)
        } catch (error:any) {
          console.log(error);
          toast(error.response.data.message)
        }
  };
    useEffect(() => {
      if (!resume) {
        setButtonDisabled(true);
      }
    }, [resume]);
    return (
      <div className="flex flex-col my-4">
        <h1 className="text-2xl font-semibold my-2">uploads yours resume...</h1>
        <form>
          <input
            type="file"
            required={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setResume(e.target.files && e.target.files[0] )
            }
            className=" px-2 py-1 rounded-2xl my-2"
          />
        </form>
        <button
          onClick={onSubmitResumeHandler}
          className={`w-full hover:bg-green-950 hover:text-white transition-colors md:w-28 py-2 font-semibold text-base text-black rounded-lg cursor-pointer ${buttonDisabled ? "bg-slate-300" : "bg-green-500"} `}
        >
          upload
        </button>
      </div>
    );
};

export default UploadResume;
