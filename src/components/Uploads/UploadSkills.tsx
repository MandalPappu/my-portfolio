import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UploadSkills = () => {
  const [skillName, setSkillName] = useState("");
  const [skillImage, setSkillImage] = useState<File | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onSubmitSkillHandler = async () => {
    try {

      if (!skillImage || !skillName) return;
      const formData = new FormData();
      formData.append("skillImage", skillImage);
      formData.append("skillName", skillName);
      const res = await axios
        .post("/api/skill/add", formData)
        .then((res) => res.data.message)
        .catch((res) => res.response.data.message);

      toast(res, { position: "top-center", autoClose: 2000 });
      setSkillName("")
      setSkillImage(null)
    } catch (error:any) {
      console.log(error);
      toast(error.response.data.message)
    }
  };

  useEffect(() => {
    if (
      {skillImage:"",
      skillName: ""}
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [skillImage, skillName]);

  return (
    <div className="flex flex-col my-4">
      <h1 className="text-2xl font-semibold my-2">uploads yours skills...</h1>
      <form className="w-full">
        <input
          type="text"
          placeholder="skill name's..."
          required={true}
          value={skillName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setSkillName(e.target.value);
          }}
          className="px-2 w-full md:w-56 py-1 rounded-md my-2 bg-slate-500/15 outline-none text-xl placeholder:text-base"
        />
        <input
          type="file"
          required={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSkillImage(e.target.files ? e.target.files[0] : null)
          }
          className="px-2 py-1 rounded-2xl my-2"
        />
      </form>
      <button
        onClick={onSubmitSkillHandler}
        className={`w-full hover:bg-green-950 hover:text-white transition-colors md:w-28 py-2 font-semibold text-base text-black rounded-lg cursor-pointer ${
          buttonDisabled ? "bg-slate-300" : "bg-green-500"
        } `}
      >
        upload
      </button>
    </div>
  );
};

export default UploadSkills;
