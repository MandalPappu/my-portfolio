import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { BackgroundGradient } from "./ui/background-gradient";
import { FlipWords } from "./ui/flip-words";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";


const words = ["Mern", "ReactJS", "NextJS", "NodeJS", "MongoDB", "PostgreSQL", "ExpressJS", "DevOps", "Blockchain"];
const typeWriterWords = [
  {
    text: "Full",
    className: "text-slate-400 dark:text-slate-400 font-semibold text-2xl",
  },
  {
    text: "Stack",
    className: "text-slate-400 dark:text-slate-400 font-semibold text-2xl",
  },
  {
    text: "Developer.",
    className: "text-orange-500 dark:text-orange-500 font-bold text-4xl",
  },
];

const Hero = () => {

  const [data, setData] = useState({
    resume: "",
    _id:""
  });

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get("/api/resume/get");
      console.log("resume", res.data.data);     
      setData(res.data.data);
    } catch (error:any) {
      toast(error.response.data.message);
      process.exit(1);
    }
  }, [])
  
  useEffect(() => {
    fetchData();
  }, [])
  
  const deleteResume = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios
        .delete("/api/resume/delete/", {data})
        .then((res) =>
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          })
        )
        .catch((error: any) =>
          toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: 2000,
          })
        );
    } catch (error:any) {
      toast(error.response.data.message)
    }
      
  }

  return (
    <div className="w-full flex sm:flex-row flex-col-reverse justify-between items-center sm:px-8 lg:px-28 ">
      <div className="w-full sm:w-1/2 sm:mt-20 text-center sm:text-start">
        <p className="text-3xl md:text-4xl my-4">Hi,</p>
        <h2 className="text-2xl sm:text-xl md:text-3xl lg:text-6xl my-4 ">
          I'm Pappu Mandal
        </h2>
        <h1 className="text-4xl my-4">
            <TypewriterEffectSmooth words={typeWriterWords} className="ml-20 sm:ml-0 md:ml-0 lg:ml-0"/>
        </h1>
        <h2>
          <FlipWords words={words} className="text-slate-300 text-2xl my-2" />
        </h2>
        <div>
          <button className="px-3 py-1 font-semibold text-2xl bg-[#06D001] rounded-xl text-black my-4">
            <Link
              href={data?.resume ? data.resume : "https://www.404notfound.com"}
              download={data?.resume}
              target="_blank"
              key={data?._id}
            >
              resume
            </Link>
          </button>
          <button
            onClick={deleteResume}
            className="bg-rose-700 px-4 py-2 ml-4 rounded-xl font-semibold text-xl text-black"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="w-full sm:w-1/2 flex justify-center sm:items-center py-4 ">
        <div className="w-80 h-80 md:h-96 flex justify-center items-center sm:pt-9">
          <BackgroundGradient className="dark:bg-zinc-900 rounded-2xl">
            <img
              src={`/profile.jpg`}
              alt="skill-image"
              className="w-80 h-80 rounded-3xl sm:h-60 lg:h-80 object-fill mx-auto py-3 px-2 md:py-2 outline-none"
            />
          </BackgroundGradient>
        </div>
      </div>
    </div>
  );
};

export default Hero;
