import React, { useMemo, useState } from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const Hero = () => {
  const words = [
    {
      text: "Full",
      className: "text-slate-600 dark:text-slate-600 text-3xl ",
    },
    {
      text: "Stack",
      className: "text-slate-600 dark:text-slate-600 text-3xl",
    },
    {
      text: "Developer",
      className: "text-orange-400 dark:text-orange-400 text-4xl",
    },
  ];
  const [data, setData] = useState({
    resume:""
  });
  const [saveData, setSaveData] = useState(false)

  useMemo(async () => {
    try {
      const res = await axios.get("/api/resume/get");
      setData(res.data.data);
    } catch (error:any) {
      toast(error.response.data.message)
    }
  }, [])
  
  const saveResume = () => {
    setSaveData(true)
  }
  

  return (
    <div className="flex justify-between">
      <div className="w-1/2 md:mt-20 mx-12">
        <p className="text-2xl md:text-4xl my-4">Hi,</p>
        <h2 className="text-2xl md:text-6xl my-4 ">I'm Pappu Mandal</h2>
        <h1 className="text-4xl my-4 font-semibold">
          <TypewriterEffectSmooth words={words} />
        <Link
          href={data.resume ? data.resume : "https://www.404notfound.com"  }
          download={data.resume}
          target="_blank"
          onClick={saveResume}
          className="px-6 py-2 font-semibold text-2xl bg-[#06D001] rounded-xl text-black my-4"
        >
          resume
        </Link>
        </h1>
      </div>
      <div className="-mt-8">
        <img src="../codeman.webp" alt="profile" className="w-[40rem]" />
      </div>
    </div>
  );
};

export default Hero;
