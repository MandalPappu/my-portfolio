"use client"
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Logout: React.FC = () => {

    const handleLogout =async () => {
        const res = await axios.get("api/logout")
         if (res.data.success == true) {
           toast.success(res?.data?.message);
           redirect("/login");
         } else {
           toast.error(res?.data?.message);
         }
    }
    return <button
        onClick={handleLogout}
        className="bg-sky-300 text-black px-4 py-1"
    >Logout</button>;
};

export default Logout;
