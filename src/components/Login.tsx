import { login } from "@/lib/authSlice";
import { useAppSelector } from "@/lib/hooks";
import { AppDispatch, RootState } from "@/lib/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Hero from "./Hero";
import Admin from "./Admin";
import { Loader2Icon } from "lucide-react";


interface IUser {
  email: string;
  password: string;
}

const Login = () => {
    const userId = useAppSelector((state: RootState) => state.auth.userId);

    const [userData, setUserData] = useState<IUser>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()


    const handleSubmite = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        await axios
            .post("/api/login", userData)
            .then((res) => {
                toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                });
                console.log(res.data);
                dispatch(login(res?.data?.userId));
                setLoading(false);
                router.push("/");
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.message, {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
                setLoading(false);
            });
    };

  
    useEffect(() => {
        if (!userData.email.trim() || !userData.password) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [userData.email, userData.password]);

    if (userId) {
        return <Admin/>
    } else {
        return (
          <div className="w-full h-screen bg-slate-950 text-slate-600 flex justify-center p-8">
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-4xl font-bold my-3 text-center">
                please Login
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
                    "login"
                  )}
                </button>
              </form>
            </div>
          </div>
        );
    }
}


export default Login;
