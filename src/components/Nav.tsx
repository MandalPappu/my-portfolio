import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <div className="w-[50%] mx-auto my-5 flex justify-center px-3 py-5 bg-slate-700/40 rounded-full">
      <ul className="flex justify-between items-center">
        <li className="mx-4 font-semibold text-2xl hover:text-white/40 transition-all">
          <Link href="#About">About</Link>
        </li>
        <li className="mx-4 font-semibold text-2xl hover:text-white/40 transition-all">
          <Link href="#Skills">Skills</Link>
        </li>
        <li className="mx-4 font-semibold text-2xl hover:text-white/40 transition-all">
          <Link href="#Projects">Projects</Link>
        </li>
        <li className="mx-4 font-semibold text-2xl hover:text-white/40 transition-all">
          <Link href="#Contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
