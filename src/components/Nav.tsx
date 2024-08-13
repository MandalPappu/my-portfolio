"use client";
import Link from "next/link";
import React from "react";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Logout from "./Logout";


function Nav() {
  const  userId  = useAppSelector((state:RootState) => state.auth.userId);
   
  return (
    <div className="w-full mt-10 text-center hidden sm:block">
      <nav className=" flex justify-center items-center gap-8 text-slate-400">
        <div>
          <Link
            href="#About"
            className="hover:bg-slate-400 font-semibold hover:text-black rounded-full text-2xl px-4 py-2"
          >
            About
          </Link>
        </div>
        <div>
          <Link
            href="#Skills"
            className="hover:bg-slate-400 font-semibold hover:text-black rounded-full px-4 py-2 text-2xl"
          >
            Skills
          </Link>
        </div>
        <div>
          <Link
            href="#Projects"
            className="hover:bg-slate-400 font-semibold hover:text-black rounded-full px-4 py-2 text-2xl"
          >
            Projects
          </Link>
        </div>
        <div>
          <Link
            href="#Contact"
            className="hover:bg-slate-400 font-semibold hover:text-black rounded-full px-4 py-2 text-2xl"
          >
            Contact
          </Link>
        </div>
        {userId ? <Logout classname="px-4 py-2 hover:bg-slate-400 hover:text-black text-2xl font-bold rounded-3xl"/> : ""}
      </nav>
    </div>
  );
}

export default Nav;
