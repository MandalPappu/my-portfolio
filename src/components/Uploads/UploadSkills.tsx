import axios from "axios";
import { Loader2Icon, Upload } from "lucide-react";
import React, { MouseEvent, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
 
const UploadSkills:React.FC = () => {
  const [skillName, setSkillName] = useState("");
  const [skillImage, setSkillImage] = useState<File | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onSubmitSkillHandler = async (e:MouseEvent<HTMLButtonElement>) => {
e.preventDefault();
    try {
      setLoading(true)
      if (!skillImage || !skillName) return;
      const formData = new FormData();
      formData.append("skillImage", skillImage);
      formData.append("skillName", skillName.trim());
      const res = await axios
        .postForm("/api/skill/add", formData)
        .then((res) => res.data.message)
        .catch((res) => res.response.data.message);

      toast(res, { position: "top-center", autoClose: 2000 });
      setSkillName("");
      setSkillImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setLoading(false)
    } catch (error:any) {
      console.log(error);
      toast(error.response.data.message)
      setSkillName("");
      setSkillImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
    setLoading(false);
  };

  useEffect(() => {
    if (
      !skillName.trim() || !skillImage
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [skillImage, skillName]);


  return (
    <div className="flex w-80 mx-auto sm:mx-4 flex-col my-4 sm:text-start">
      <h1 className="text-2xl font-semibold my-2">uploads yours skills...</h1>
      <form className="w-full relative">
        <input
          type="text"
          placeholder="skill name's..."
          required={true}
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          className="px-2 md:w-56 py-1 rounded-[6px] my-2 bg-slate-500/15 outline-none text-xl placeholder:text-base"
        />
        <label htmlFor="skillFile">
          <Upload
            size={30}
            className="mx-auto bg-black absolute w-[105px] h-9 bottom-6 -left-1"
          />
        </label>
        <input
          ref={fileInputRef}
          id="skillFile"
          type="file"
          required={true}
          onChange={(e) =>
            setSkillImage(e.target.files ? e.target?.files[0] : null)
          }
          className="w-60 py-4 cursor-pointer my-2"
        />
      </form>
      <button
        onClick={onSubmitSkillHandler}
        disabled={buttonDisabled}
        className={`w-[10rem] mx-auto sm:mx-0 my-4 hover:opacity-50 flex justify-center items-center gap-1 transition-colors sm:w-32 py-2 px-4 font-semibold text-base text-black rounded-xl cursor-pointer bg-green-500 ${
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

export default UploadSkills;
