import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen md:h-full  bg-slate-950 text-slate-400 md:px-[10rem] px-4">
      <h1 className="text-center font-bold text-2xl md:text-4xl py-4">
        Admin Dashboard
      </h1>
      <div className="flex justify-center md:justify-between items-center md:gap-2">
        <div className="my-10 w-full md:w-1/2">
          <h1 className="text-2xl font-semibold w-full">
            username:{" "}
            <span className="font-bold text-3xl text-rose-200">
              pappumandal
            </span>
          </h1>
          <div className="flex flex-col my-4">
            <h1 className="text-2xl font-semibold my-2">
              uploads yours skills...
            </h1>
            <input
              type="text"
              placeholder="skill name's..."
              className="px-2 w-full md:w-56 py-1 rounded-md my-2 bg-slate-500/15 outline-none text-xl placeholder:text-base"
            />
            <input type="file" className="px-2 py-1 rounded-2xl my-2" />
            <button className="w-full md:w-28 px-6 py-2 font-semibold text-base bg-green-500 text-black rounded-lg cursor-pointer">
              submit
            </button>
          </div>
          <div className="flex flex-col my-4">
            <h1 className="text-2xl font-semibold my-2">
              uploads yours projects...
            </h1>
            <input
              type="text"
              placeholder="project name's..."
              className="px-2 w-full md:w-56 py-1 rounded-md my-2 bg-slate-500/15 outline-none text-xl placeholder:text-base"
            />
            <input type="file" className=" px-2 py-1 rounded-2xl my-2" />
            <button className="w-full md:w-28 px-6 py-2 font-semibold text-base bg-green-500 text-black rounded-lg cursor-pointer">
              submit
            </button>
          </div>
        </div>
        <div className="w-1/2 h-full hidden md:block">
          <img src="../boyicon.png" alt="boy" className="w-[90%]" />
        </div>
      </div>
      <div>
        <h1 className="text-center font-bold text-2xl md:text-4xl">
          Contact person
        </h1>
        <div className="py-4">
          <div className="bg-slate-700/10 w-full md:w-1/2 text-center mx-auto my-4 rounded-lg p-4">
            <h1 className="text-2xl font-semibold">John Doe</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              dicta culpa repellat nisi. Voluptas soluta corporis, dolore at
              illo perferendis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
