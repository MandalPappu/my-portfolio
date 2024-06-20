import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen bg-slate-950 text-slate-600 flex justify-center p-8">
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-4xl font-bold my-3 text-center">
          Login
        </h1>
        <form className="flex flex-col w-80 border rounded-xl p-6 my-4">
          <input
            type="email"
            placeholder="email"
            className="my-2 px-2 py-2 bg-slate-600/10 text-xl "
          />
          <input
            type="password"
            placeholder="password"
            className="my-2 px-2 py-2 bg-slate-600/10 text-xl "
          />
          <button className="px-2 py-2 bg-green-600 text-black font-semibold rounded-xl">
            submit
          </button>
          <p className="text-sm my-2">
            didn't have Account?{" "}
            <Link href="/signup" className="font-bold text-sky-300">
              please signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default page;
