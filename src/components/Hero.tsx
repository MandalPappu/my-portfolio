"use client";
import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { FlipWords } from "./ui/flip-words";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Loader2 } from "lucide-react";
import Image from "next/image";


const words = [
  "Mern_Stack",
  "ReactJS",
  "NextJS",
  "NodeJS",
  "MongoDB",
  "PostgreSQL",
  "ExpressJS",

];
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
    _id: "",
  });
  const [processing, setProcessing] = useState(false)
  const userId = useAppSelector((state: RootState) => state.auth.userId);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get("/api/resume/get");
      setData(res.data.data);
    } catch (error: any) {
      toast(error.response.data.message);
      process.exit(1);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const deleteResume = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await axios
        .delete("/api/resume/delete/", { data })
        .then((res) =>
          toast.success(res.data.message, {
            position:"top-center",
            autoClose: 2000
          })
        )
        .catch((error: any) =>
          toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: 2000,
          })
      );
      setData({
        resume: "",
        _id: "",
      });
      setProcessing(false)
    } catch (error: any) {
      toast(error.response.data.message);
      setProcessing(false)
    }
  };

  return (
    <>
      <div className="w-full mt-10 flex sm:flex-row flex-col-reverse justify-between items-center sm:px-8 lg:px-28 ">
        <div className="w-full sm:w-1/2 sm:mt-20 text-center sm:text-start">
          <p className="text-3xl md:text-4xl my-4">Hi,</p>
          <h2 className="text-2xl sm:text-xl md:text-3xl lg:text-6xl my-4 ">
            I&apos;m Pappu Mandal
          </h2>
          <h1 className="text-4xl my-4 flex justify-center sm:block">
            <TypewriterEffectSmooth
              words={typeWriterWords}
              className="sm:ml-0 md:ml-0 lg:ml-0"
            />
          </h1>
          <h2>
            <FlipWords words={words} className="text-slate-300 text-2xl my-2" />
          </h2>
          <div
            className={`${
              data?.resume ? "block" : "hidden"
            } w-full flex gap-2 items-center justify-center sm:justify-normal`}
          >
            <Link
              href={data?.resume ? data.resume : "not found"}
              download={true}
              target="_blank"
              key={data?._id}
              className="px-3 py-1 ml-3 font-semibold text-2xl bg-[#06D001] outline-none rounded-xl text-black my-4 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800  text-center me-2 mb-2"
            >
              resume
            </Link>
            <button
              onClick={deleteResume}
              className={`bg-rose-700 ${
                userId ? "block" : "hidden"
              } py-1 px-3 ml-4 rounded-xl font-semibold text-black`}
            >
              {processing ? (
                <div className="flex items-center gap-2">
                  <Loader2 size={15} className="animate-spin" />
                  <h2>deleting...</h2>
                </div>
              ) : (
                "Delete resume"
              )}
            </button>
          </div>
        </div>
        <div className="w-full sm:w-1/2 flex justify-center sm:items-center py-4 -mb-20">
          <div className="w-80 h-80 md:h-96 md:flex justify-center items-center">
            <Image
              src="/profile.jpg"
              width={532}
              height={532}
              alt="profile-image"
              className="w-52 h-52 rounded-full sm:w-80 sm:h-80 object-fill mx-auto py-3 px-2 md:py-2 outline-none"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
