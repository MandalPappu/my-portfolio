"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import {toast} from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { logout } from "@/lib/authSlice";
const Logout = ({classname=""}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>()
    const handleLogout =async () => {
        const res = await axios.delete("api/logout")
         if (res.data.success == true) {
           toast.success(res?.data?.message);
           dispatch(logout())
           router.push("/");
         } else {
           toast.error(res?.data?.message);
         }
    }
    return <button
        onClick={handleLogout}
        className={classname}
    >Logout</button>;
};

export default Logout;
