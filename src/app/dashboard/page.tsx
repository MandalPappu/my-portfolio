"use client";
import React, {useState,} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import UploadSkills from "@/components/Uploads/UploadSkills";
import UploadProjects from "@/components/Uploads/UploadProjects";
import UploadResume from "@/components/Uploads/UploadResume";

import { FaRegBell } from "react-icons/fa";
import UploadAbout from "@/components/Uploads/UploadAbout";
import Messages from "@/components/Messages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMenu } from "react-icons/io5";


const page = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    await axios
      .delete("/api/logout")
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
        });
        router.push("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 300,
        });
      });
  };

  const showMenu = ()=>{}
  return (
    <div className="w-full min-h-fit bg-slate-950">
      <div className="w-full md:h-screen  bg-slate-950 text-slate-400 md:px-14 px-4">
        <nav className="flex my-2 h-16 justify-between items-center px-2 rounded-xl">
          <h1 className="md:text-3xl text-2xl font-bold">Pappu</h1>
          <IoMenu size={30} onClick={showMenu} className="sm:hidden" />
          <div className="sm:flex items-center gap-4 hidden">
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <FaRegBell size={25} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-950">
                  <DropdownMenuLabel className="text-white">
                    Messages
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="bg-slate-950 ">
                    <Messages />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <button
              onClick={logoutHandler}
              className="text-xl font-bold rounded-2xl px-4 hover:bg-slate-500 hover:text-black"
            >
              Logout
            </button>
          </div>
        </nav>
        <div>
          <div className="my-10 w-full">
            <div className="flex  sm:items-center flex-wrap justify-center sm:justify-between">
              <div>
                <UploadSkills />
              </div>
              <div>
                <UploadProjects />
              </div>
              <div>
                <UploadResume />
              </div>
              <div>
                <UploadAbout />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
