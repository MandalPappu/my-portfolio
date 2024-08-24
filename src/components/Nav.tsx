"use client";
import React from "react";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Logout from "./Logout";
import Link from "next/link";




function Nav() {
  const userId = useAppSelector((state: RootState) => state.auth.userId);
  return (
    <div>
      <div className="w-full mt-10 text-center hidden sm:block">
        <nav className="hidden sm:flex justify-center items-center md:gap-8 gap-2 text-slate-400 mx-10">
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
            <Logout classname="px-4 py-2 hover:bg-slate-400 hover:text-black text-2xl font-bold rounded-3xl" />
          ) : (
            ""
          )}
        </nav>
      </div>
      <div className="w-full z-50 py-6 sm:hidden flex justify-between items-center px-4">
        <h1 className="">
          <b className="text-4xl text-orange-500">{"<"}</b>{" "}
          <span className="text-4xl font-bold text-gredient">Pappu</span>{" "}
          <b className="text-4xl text-orange-600">{"/>"}</b>
        </h1>
        <div>
          {userId ? (
            <Logout classname="text-xl font-semibold px-6 py-2 rounded-2xl text-black hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 bg-gradient-to-tr from-orange-400 to-purple-500" />
          ) : (
            <Link
                href="#Contact"
              className="text-xl font-semibold px-6 py-2 rounded-2xl text-black hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 bg-gradient-to-tr from-orange-400 to-purple-500"
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
