import React from "react";

const Contact = () => {
  return (
    <div className="p-10">
      <h1 className="text-center font-bold text-2xl md:text-4xl text-slate-400 my-4">
        Contact
      </h1>
      <div className="w-[30rem] flex flex-col gap-2 mx-auto my-10">
        <input
          type="text"
          placeholder="Name"
          className="px-3 py-3 outline-none border-b-2 bg-transparent text-lg text-white"
        />
        <input
          type="email"
          placeholder="Email"
          className="px-3 py-3 outline-none border-b-2 bg-transparent text-lg text-white"
        />
        <textarea
          name="message"
          id="message"
          placeholder="any message for me..."
          className="px-3 py-3 outline-none border-b-2 bg-transparent text-white text-lg"
        ></textarea>
        <button className="bg-green-400 text-black px-2 rounded-lg mx-auto py-2 font-bold text-lg mt-4">
          send messages
        </button>
      </div>
    </div>
  );
};

export default Contact;
