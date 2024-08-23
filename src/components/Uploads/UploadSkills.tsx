import axios from "axios";
import { Loader2Icon } from "lucide-react";
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
      formData.append("skillName", skillName);
      const res = await axios
        .post("/api/skill/add", formData)
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
    <div className="flex w-80 mx-auto sm:mx-0 flex-col my-4 text-center sm:text-start">
      <h1 className="text-2xl font-semibold my-2">uploads yours skills...</h1>
      <form className="w-60 mx-auto sm:mx-0">
        <input
          type="text"
          placeholder="skill name's..."
          required={true}
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          className="px-2 w-full md:w-56 py-1 rounded-md my-2 bg-slate-500/15 outline-none text-xl placeholder:text-base"
        />
        <input
          ref={fileInputRef}
          type="file"
          required={true}
          onChange={(e) =>
            setSkillImage(e.target.files ? e.target?.files[0] : null)
          }
          className="px-2 py-1 rounded-2xl my-2 w-60 sm:w-full"
        />
        <button
          onClick={onSubmitSkillHandler}
          disabled={buttonDisabled}
          className={`my-2 hover:opacity-50 flex justify-center items-center gap-1 transition-colors sm:w-32 py-2 px-4 font-semibold text-base text-black rounded-xl cursor-pointer bg-green-500 ${
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
      </form>
    </div>
  );
};

export default UploadSkills;
