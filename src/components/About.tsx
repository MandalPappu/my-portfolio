import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const  About = () => {
  const [data, setData] = useState({
    _id:"",
    aboutData:""
  });
    const [loading, setLoading] = useState(false);
  const fetchData = useCallback(async() => {
    try {
      setLoading(true)
      const res = await axios.get("/api/about/get")
      setData(res.data.data);
      setLoading(false)
    } catch (error:any) {
      toast(error.response.data.message)
      setLoading(false);
    }
  }, [])
  
  useEffect(() => {
    fetchData()
  },[])

  return loading ? (
    <h1 className="text-center text-3xl ">about is Loading...</h1>
  ) : (
    <div className="w-full my-4 md:my-0 sm:px-0 md:pr-20">
      <h1 className="text-3xl text-center font-bold mt-24 mb-6">About</h1>
      <div className=" sm:flex sm:justify-between sm:items-center sm:gap-4">
        <img
          src="../../boyicon.webp"
          alt="about icon"
          className="hidden md:block w-[40rem] h-96"
        />
        {data ? (
          <p key={data._id} className="w-[70%] text-3xl leading-relaxed mx-auto">
            {data?.aboutData}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default About;
