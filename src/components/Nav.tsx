'use client'
import Link from "next/link";
import React from "react";

function Nav() {
  return (
    <nav className="w-full mt-10 text-center hidden sm:block">
      <div className=" flex justify-center items-center gap-8 text-slate-400">
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
      </div>
    </nav>
  );
}

export default Nav;
