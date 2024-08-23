"use client"
import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

interface IUser {
  email: string;
  password: string;
}

const page = () => {
  const userId = useAppSelector((state: RootState) => state.auth.userId);
  const router = useRouter();
  if (userId) {
    router.back()
  }
  const [userData, setUserData] = useState<IUser>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
 

  const handleSubmite = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    await axios.post("/api/signup", userData)
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
        })
        setLoading(false);
        router.push("/login")
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message, {position:"top-center", autoClose:3000}) 
        }
        setLoading(false);
      })

  };

  useEffect(() => {
    if (!userData.email.trim() || !userData.password) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false)
    }
  }, [userData.email, userData.password])
  


  return userId ? "" : (
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="my-2 px-2 py-2 bg-slate-600/10 text-xl "
          />
          <button
            type="submit"
            disabled={buttonDisabled}
            className={`bg-green-500 ${
              buttonDisabled ? "bg-green-950" : "bg-green-500"
            } my-2 hover:bg-green-600 flex justify-center items-center gap-1 transition-colors sm:w-32 py-2 px-4 font-semibold text-base text-black rounded-xl cursor-pointer`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2Icon size={20} className="animate-spin" />
                <h2>submiting...</h2>
              </div>
            ) : (
              "signup"
            )}
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
