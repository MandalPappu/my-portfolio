"use client";
import React from "react";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Logout from "./Logout";
import Link from "next/link";
import { AlignJustify } from "lucide-react";



function Nav() {
  const userId = useAppSelector((state: RootState) => state.auth.userId);
  return (
    <div className="">
      <div className="w-full relative mt-10 text-center hidden sm:block">
        <nav className="hidden px-9 py-3 rounded-3xl sm:mx-auto bg-slate-500/20 z-[999] sm:inline-flex justify-center items-center md:gap-8 gap-2 text-slate-300 mx-10">
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
          <div className={userId ? "hidden" : "block"}>
            <Link
              href="#Contact"
              className="hover:bg-slate-400 font-semibold hover:text-black rounded-full px-4 py-2 text-2xl"
            >
              Contact
            </Link>
          </div>
          {userId ? (
            <Logout classname="px-4 py-2 hover:bg-red-800 hover:text-black text-2xl font-bold rounded-3xl" />
          ) : (
            ""
          )}
          {userId ? (
            <Link
              href="/dashboard"
              className="text-2xl font-semibold hover:text-green-500 hover:underline"
            >
              Dashboard
            </Link>
          ) : (
            ""
          )}
        </nav>
      </div>
      <div className="w-full z-50 py-3 sm:hidden flex justify-between items-center px-4">
        <h1>
          <b className="text-xl sm:text-4xl text-orange-500">{"<"}</b>{" "}
          <span className="text-xl sm:text-4xl font-bold text-gredient">
            <Link href={userId ? "/dashboard" : "/"}>Pappu</Link>
          </span>{" "}
          <b className="text-xl sm:text-4xl text-orange-600">{"/>"}</b>
        </h1>
        <div>
          {userId ? (
            <Logout classname="text-xl font-semibold px-3 sm:px-6 py-1 rounded-2xl text-black hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 bg-gradient-to-tr from-orange-400 to-purple-500" />
          ) : (
            <Link
              href="#Contact"
              className="text-xl font-semibold px-3 py-1 sm:px-6 sm:py-2 rounded-2xl text-black hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 bg-gradient-to-tr from-orange-400 to-purple-500"
            >
              Contact
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
