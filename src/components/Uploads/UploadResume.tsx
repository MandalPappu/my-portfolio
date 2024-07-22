import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";

const UploadResume = () => {
      const [resume, setResume] = useState<File | null>(null);

      const onSubmitResumeHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          if (!resume) return;
          const formData = new FormData();
          formData.append("resume", resume);
          const res = await axios.post("api/add", formData);
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      };
    return (
      <div className="flex flex-col my-4">
        <h1 className="text-2xl font-semibold my-2">uploads yours resume...</h1>
        <form onSubmit={onSubmitResumeHandler}>
          <input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setResume(e.target.files ? e.target.files[0] : null)
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

export default UploadResume;
