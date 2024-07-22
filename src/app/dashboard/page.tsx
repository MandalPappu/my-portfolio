"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import UploadSkills from "@/components/Uploads/UploadSkills";
import UploadProjects from "@/components/Uploads/UploadProjects";
import UploadResume from "@/components/Uploads/UploadResume";
import VisitorMessages from "@/components/Uploads/Visitor's-Messages";
import { FaRegBell } from "react-icons/fa";
import UploadAbout from "@/components/Uploads/UploadAbout";
import Messages from "@/components/Messages";
import { ImCross } from "react-icons/im";

const page = () => {
  const router = useRouter();
  const [iconpress, setIconPress] = useState(false);
  // const messageEnable = () => {
  //   setIconPress(iconpress +1);
  // };

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
  return (
    <div className="w-full h-screen -my-2 bg-slate-950 text-slate-400 md:px-14 px-4">
      <nav className="flex my-2 h-16 bg-slate-900 justify-between items-center px-4 rounded-xl">
        <h1 className="text-3xl font-bold">Pappu</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            {iconpress ? (
              <ImCross
                aria-expanded={iconpress ? true : false}
                onClick={() => setIconPress((prev) => !prev)}
              />
            ) : (
              <FaRegBell
                size={25}
                aria-expanded={iconpress ? true : false}
                onClick={() => setIconPress((prev) => !prev)}
              />
            )}
            {iconpress && (
              <div className="absolute top-5 right-1 w-60 rounded-md">
                <Messages />
              </div>
            )}
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
          <div className="flex items-center">
            <div className="">
              <UploadSkills />
            </div>
            <div className="">
              <UploadProjects />
            </div>
          </div>
          <div className="flex items-center gap-9">
            <div className="">
              <UploadResume />
            </div>
            <div>
              <UploadAbout />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
