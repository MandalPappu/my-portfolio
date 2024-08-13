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
          process.exit(1);
        }
      };
    useEffect(() => {
      if (resumeFile) {
        setButtonDisabled(false);
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
            className={`my-2 hover:opacity-50 flex justify-center items-center gap-1 transition-colors sm:w-32 py-2 px-4 font-semibold text-base text-black rounded-xl cursor-pointer bg-green-500 ${
              buttonDisabled ? "opacity-30" : ""
            } `}
          >
            {loading ? (
              <div className="inline">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              ""
            )}
            {loading ? "uploading..." : "upload"}
          </button>
        </form>
      </div>
    );
};

export default UploadResume;
