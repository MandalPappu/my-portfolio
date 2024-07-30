
import axios from "axios";
import React, { MouseEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UploadAbout = () => {
  const [data, setData] = useState<string>('')
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);


  const onSubmitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios
        .post("/api/about/add", {aboutData:`${data}`})
        .then((res) => res.data.message)
        .catch((res) => res.response.data.message);

      toast(res, { position: "top-center", autoClose: 2000 });
      setData("");
      setLoading(false)
    } catch (error: any) {
      setDisabled(false);
      setData("");
      setLoading(false)
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

   useEffect(() => {
     if (!data.trim()) {
       setDisabled(true);
     } else {
       setDisabled(false);
     }
   }, [data]);

  return (
    <div className="flex w-80 mx-auto sm:mx-0 flex-col my-4 text-center sm:text-start">
      <h1 className="text-2xl font-semibold my-2">About Me</h1>
      <form className="w-60 mx-auto sm:mx-0">
        <textarea
          placeholder="write something about me..."
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="px-2 w-full md:w-56 py-1 rounded-md my-2 bg-slate-500/15 outline-none text-xl placeholder:text-base"
        />
        <button
          onClick={onSubmitHandler}
          className={`my-2 hover:opacity-50 transition-colors sm:w-28 py-2 px-4 font-semibold text-base text-black rounded-xl cursor-pointer bg-green-500 ${
            disabled ? "opacity-30" : ""
          } `}
        >
          {loading ? "uploading..." : "upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadAbout;
