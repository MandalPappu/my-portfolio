import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UploadAbout = () => {
  const [data, setData] = useState({
    aboutData:""
  })
  const [disabled, setDisabled] = useState(false);

  const onSubmitHandler = async () => {
    try {
      setDisabled(true);
      console.log(data);
      
      const res = await axios.post("/api/about/add", data)
        .then((res) => res.data.message)
        .catch((res) => res.response.data.message);
      
      toast(res, { position: "top-center", autoClose: 2000 })
      setDisabled(false);
      setData({ aboutData: "" });
    } catch (error: any) {
      setDisabled(false)
      setData({aboutData: "" })
      toast.error(error.response.data.message, { position: "top-center", autoClose: 2000 })
    }
  };

  return (
    <div>
      <h1 className="text-xl text-center my-3">About</h1>
      <div className="flex gap-2">
        <form>
          <input
            type="text"
            placeholder="about..."
            value={data.aboutData}
            onChange={(e) => setData({ ...data, aboutData: e.target.value })}
            className="px-3 py-2 bg-slate-700 rounded-md"
          />
        </form>
      </div>
      <button
        onClick={onSubmitHandler}
        className={`w-full my-3 hover:bg-green-950 hover:text-white transition-colors md:w-28 py-2 font-semibold text-base text-black rounded-lg cursor-pointer ${
          disabled ? "bg-slate-300" : "bg-slate-300"
        } `}
      >
        upload
      </button>
    </div>
  );
};

export default UploadAbout;
