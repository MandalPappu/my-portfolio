import React, { useMemo, useState } from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

const Hero = () => {

  const [data, setData] = useState({
    resume:""
  });

  useMemo(async () => {
    try {
      const res = await axios.get("/api/resume/get");
      setData(res.data.data);
    } catch (error:any) {
      toast(error.response.data.message)
    }
  }, [])
  

  return (
    <div className="w-full flex sm:flex-row flex-col-reverse justify-between  sm:justify-between items-center sm:px-28 ">
      <div className="w-full sm:mt-20 text-center sm:text-start">
        <p className="text-3xl md:text-4xl my-4">Hi,</p>
        <h2 className="text-2xl sm:text-xl md:text-3xl lg:text-6xl my-4 ">
          I'm Pappu Mandal
        </h2>
        <h1 className="text-4xl my-4 font-medium">
          Full Stack <span className="font-bold text-rose-600">Developer</span>
        </h1>
        <Link
          href={data.resume ? data.resume : "https://www.404notfound.com"}
          download={data.resume}
          target="_blank"
          className="px-3 py-1 font-semibold text-2xl bg-[#06D001] rounded-xl text-black my-4"
        >
          resume
        </Link>
      </div>
      <div className=" rounded-full flex justify-center items-center ">
        <img
          src="../../profile.jpg"
          alt="profile" 
          className="w-80 h-80 rounded-full sm:h-60 lg:h-80 object-fill sm:rounded-xl mt-5 ml-6 lg:mr-[17rem] lg:mt-36  sm:ml-0 outline-none"
        />
      </div>
    </div>
  );
};

export default Hero;
