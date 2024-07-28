"use client"
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IUser {
  email: string;
  password: string;
}

const page:React.FC = ():ReactNode => {
  const [userData, setUserData] = useState<IUser>({
    email: '',
    password: ''
  }) 
  const router = useRouter()

  const handleSubmite = async (e:any) => {
    e.preventDefault()
      
    await axios.post("/api/signup", userData)
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
        });
        router.push("/login")
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message, {position:"top-center", autoClose:3000}) 
        }
      })

  };

  return (
    <div className="w-full h-screen bg-slate-950 text-slate-600 flex justify-center p-8">
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-4xl font-bold my-3 text-center">
          Signup
        </h1>
        <form
          onSubmit={handleSubmite}
          className="flex flex-col w-80 border rounded-xl p-6 my-4"
        >
          <input
            type="email"
            placeholder="email"
            value={userData.email}
            required
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
          <p className="text-base my-2">
            have any Account?{" "}
            <Link href="/login" className="font-bold text-sky-300">
              please login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default page;
