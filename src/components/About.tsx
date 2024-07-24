import axios from "axios";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";

const About = () => {
  const [data, setData] = useState({
    _id:"",
    aboutData:""
  });
    
  useMemo(async() => {
    try {
      const res = await axios.get("/api/about/get")
      console.log(res.data.data);
      
      setData(res.data.data)
    } catch (error:any) {
      toast(error.response.data.message)
    }
  },[])

  return (
    <div className="w-full">
      {data ? 
          <p key={data._id} className="text-3xl leading-relaxed">
            {data?.aboutData}
          </p>
         : ""}
      {/* <p className="text-3xl leading-relaxed">
        Hi! I’m Pappu Mandal, a MERN-Stack web developer. I can say that
        learning these technologies is the best decision of my life, I love to
        learn new technologies and flex my creativity to create amazing things.
      </p> */}
    </div>
  );
};

export default About;
