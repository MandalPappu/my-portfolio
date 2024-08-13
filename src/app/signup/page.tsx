"use client"
import React, { FormEvent, ReactNode, useEffect, useState } from "react";
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
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter()

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
  },[userData.email, userData.password])

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
            className={`bg-green-500 ${buttonDisabled ? "bg-green-950" : "bg-green-500"} my-2 hover:bg-green-600 flex justify-center items-center gap-1 transition-colors sm:w-32 py-2 px-4 font-semibold text-base text-black rounded-xl cursor-pointer`}
          >
            {loading ? (
              <div className="inline">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              ""
            )}
            {loading ? "submiting..." : "signUp"}
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
