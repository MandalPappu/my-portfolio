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
    <div className="w-full h-full">
      <div className="w-full md:h-screen text-slate-400 md:px-14 px-4">
        <div className="flex my-2 h-16 justify-between items-center px-2 rounded-xl">
          <h1 className="md:text-3xl text-2xl font-bold">Pappu</h1>
          <div>
            <Logout classname="px-4 py-2 bg-slate-800 rounded-3xl font-semibold hover:bg-slate-500 hover:text-black"/>
          </div>
        </div>
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
        <div className="w-full my-10">
          <h1 className="text-2xl font-semibold text-center my-2">Messages</h1>
          <Messages />
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </div>
  ) : (
      <div className="w-full h-screen flex justify-center items-start">
        <h1 className="text-3xl font-bold text-slate-400 mt-12">Please <Link href="/login" className="text-blue-400 underline">login...</Link></h1>
      </div>
  )
};

export default Admin;
