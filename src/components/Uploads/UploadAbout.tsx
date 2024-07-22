import React from "react";

const UploadAbout = () => {
  return (
    <div>
      <h1 className="text-xl text-center my-3">About</h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="title"
          className="px-3 py-2 bg-slate-700 rounded-md"
        />
        <input
          type="text"
          placeholder="about..."
          className="px-3 py-2 bg-slate-700 rounded-md"
        />
      </div>
      <input
        type="submit"
        value="submit"
        className="w-full md:inline my-3 hover:bg-green-950 hover:text-white transition-colors md:w-28 px-6 py-2 font-semibold text-base bg-green-500 text-black rounded-lg cursor-pointer"
      />
    </div>
  );
};

export default UploadAbout;
