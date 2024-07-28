import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [data, setData] = useState({
    visitorName: "",
    visitorEmail: "",
    visitorMessage: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onMessageSend = async () => {
    const res = await axios.post("/api/visitorMessage/add", data)
      .then((res) => res.data.message)
      .catch((err) => err.response.data.message);
    toast(res,{position:"top-center", autoClose:2000})
  }

  useEffect(() => {
    if (data.visitorName.length > 0 && data.visitorEmail.length > 0 && data.visitorMessage.length > 0) {
      setButtonDisabled(false);
    }
  },[data])
  
  return (
    <div>
      <h1 className="text-center font-bold text-3xl md:text-4xl text-slate-400 mt-12">
        Contact
      </h1>
      <div className="w-full md:w-[30rem] flex flex-col gap-2 sm:mx-auto px-8 my-10">
        <input
          type="text"
          placeholder="Name"
          required={true}
          value={data.visitorName}
          onChange={(e) => setData({ ...data, visitorName: e.target.value })}
          className="px-3 py-3 outline-none border-b-2 bg-transparent text-lg text-white"
        />
        <input
          type="email"
          placeholder="Email"
          required={true}
          value={data.visitorEmail}
          onChange={(e) => setData({ ...data, visitorEmail: e.target.value })}
          className="px-3 py-3 outline-none border-b-2 bg-transparent text-lg text-white"
        />
        <textarea
          name="message"
          required={true}
          placeholder="any message for me..."
          maxLength={150}
          rows={2}
          value={data.visitorMessage}
          onChange={(e) => setData({ ...data, visitorMessage: e.target.value })}
          className="px-3 outline-none border-b-2 bg-transparent text-white text-lg min-h-8 max-h-20"
        />
        <button disabled={buttonDisabled} onClick={onMessageSend} className="bg-green-400 hover:bg-green-700 rounded-xl text-black px-2 mx-auto py-2 font-bold text-lg mt-4">
          {buttonDisabled ? "fill all fields " : "send Message"}
        </button>
      </div>
    </div>
  );
};

export default Contact;
