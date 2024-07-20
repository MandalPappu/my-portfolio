import React from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import Link from "next/link";

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

  return (
    <div className="flex justify-between">
      <div className="w-1/2 md:mt-20 mx-12">
        <p className="text-2xl md:text-4xl my-4">Hi,</p>
        <h2 className="text-2xl md:text-6xl my-4 ">I'm Pappu Mandal</h2>
        <h1 className="text-4xl my-4 font-semibold">
          <TypewriterEffectSmooth words={words} />
        </h1>
        <Link
          href="../codeman.png"
          download={"../codeman.webp"}
          className="px-6 py-2 font-semibold text-2xl bg-[#06D001] rounded-xl text-black my-4"
        >
          resume
        </Link>
      </div>
      <div className="-mt-8">
        <img src="../codeman.webp" alt="profile" className="w-[40rem]" />
      </div>
    </div>
  );
};

export default Hero;
