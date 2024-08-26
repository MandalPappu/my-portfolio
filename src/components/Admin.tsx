"use client";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import UploadSkills from "@/components/Uploads/UploadSkills";
import UploadProjects from "@/components/Uploads/UploadProjects";
import UploadResume from "@/components/Uploads/UploadResume";
import UploadAbout from "@/components/Uploads/UploadAbout";
import Messages from "@/components/Messages";
import { RxExit } from "react-icons/rx";
import { useAppSelector } from "@/lib/hooks";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/authSlice";
import Login from "@/components/Login";
import Footer from "./Footer";
import Logout from "./Logout";
import Link from "next/link";

const Admin = () => {
  const router = useRouter();
  const userId = useAppSelector((state: RootState) => state.auth.userId);

  const dispatch = useDispatch<AppDispatch>();
 const logoutHandler = async () => {
    await axios
      .delete("/api/logout")
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
        });
        dispatch(logout());
        router.push("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 300,
        });
      });
  };


  return userId ? (
    <div className="w-full h-full relative">
      <div className="w-full bg-slate-700/20 rounded-2xl fixed z-50 py-3 flex justify-between items-center mt-2 px-4 sm:px-14 md:px-32">
        <h1>
          <b className="text-xl sm:text-4xl text-orange-500">{"<"}</b>{" "}
          <span className="text-xl sm:text-4xl font-bold text-gredient">
            <a href="/">Pappu</a>
          </span>{" "}
          <b className="text-xl sm:text-4xl text-orange-600">{"/>"}</b>
        </h1>
        <div>
          <Logout classname="text-xl font-semibold px-3 sm:px-6 py-0 rounded-2xl text-black hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 bg-gradient-to-tr from-orange-400 to-purple-500" />
        </div>
      </div>
      <div className="w-full pt-16 px-4 sm:px-14 md:px-32">
        <div className="ml-6 md:ml-0 sm:flex">
          <UploadSkills />
          <UploadProjects />
          <UploadResume />
          <UploadAbout />
        </div>
          <Messages/>
        <div>
          <Footer/>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-start">
      <h1 className="text-3xl font-bold text-slate-400 mt-12">
        Please{" "}
        <Link href="/login" className="text-blue-400 underline">
          login...
        </Link>
      </h1>
    </div>
  );
};

export default Admin;
