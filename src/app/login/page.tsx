"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify"
import { useRouter } from "next/navigation";

const page: React.FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    password:""
  })
  const router = useRouter()

  const handleSubmite = async (e: any) => {
    e.preventDefault();
    await axios.post("/api/login", userData)
      .then((res) => {
        console.log(res.data);
        
      toast.success(res.data.message,{position:"top-center", autoClose:3000})
      router.push("/dashboard")
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message, { position: "top-center", autoClose: 3000 })
        })

  };
  return (
    <div className="w-full h-screen bg-slate-950 text-slate-600 flex justify-center p-8">
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-4xl font-bold my-3 text-center">
          Login
        </h1>
        <form
          onSubmit={handleSubmite}
          className="flex flex-col w-80 border rounded-xl p-6 my-4"
        >
          <input
            type="email"
            placeholder="email"
            required
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="my-2 px-2 py-2 bg-slate-600/10 text-xl "
          />
          <input
            type="password"
            placeholder="password"
            minLength={6}
            maxLength={12}
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="my-2 px-2 py-2 bg-slate-600/10 text-xl "
          />
          <button
            type="submit"
            className="px-2 py-2 bg-green-600 text-black font-semibold rounded-xl"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
