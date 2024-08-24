'use client'
import React from "react";
import Login from "@/components/Login";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";

const page = () => {
  const userId = useAppSelector((state: RootState) => state.auth.userId);
  const router = useRouter();
  if (userId) {
    router.push("/");
  }
  
  return userId ? "" : (
    <Login />
  );
}

export default page;
