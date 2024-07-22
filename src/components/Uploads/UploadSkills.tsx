import axios from "axios";
import React, { ChangeEvent, useState } from "react";

const UploadSkills = () => {
  const [skillName, setSkillName] = useState("");
  const [skillImage, setSkillImage] = useState<File | null>(null);

  const onSubmitSkillHandler = async () => {
    try {
      if (!skillImage || !skillName) return;
      const formData = new FormData();
      formData.append("skillImage", skillImage);
      formData.append("skillName", skillName);
      const res = await axios.post("api/skill/add", formData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (

      <div className="flex flex-col my-4">
        <h1 className="text-2xl font-semibold my-2">uploads yours skills...</h1>
        <form className="w-full">
          <input
            type="text"
            placeholder="skill name's..."
            value={skillName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setSkillName(e.target.value);
            }}
            className="px-2 w-full md:w-56 py-1 rounded-md my-2 bg-slate-500/15 outline-none text-xl placeholder:text-base"
          />
          <input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSkillImage(e.target.files ? e.target.files[0] : null)
            }
            className="px-2 py-1 rounded-2xl my-2"
          />
        </form>
        <button
            onClick={onSubmitSkillHandler}
            className="w-full md:inline hover:bg-green-950 hover:text-white transition-colors md:w-28 px-6 py-2 font-semibold text-base bg-green-500 text-black rounded-lg cursor-pointer"
          >
            upload
        </button>
      </div>

  );
};

export default UploadSkills;
