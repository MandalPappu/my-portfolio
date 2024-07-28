import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const Skills = () => {
  const [data, setData] = useState([
    {_id:"", skillImage:"", skillName:""}
  ]);
  const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/skill/get")
      console.log(res.data.allSkills);
      setData(res.data.allSkills);
      setLoading(false);
    } catch (error:any) {
      console.log(error);
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }, []);


  useEffect(() => {
    fetchData();
  }, []);
  
  return loading ? (
    <h1 className="text-center text-3xl text-slate-400">
      Skills are loading...
    </h1>
  ) : (
    <div className="w-full text-center sm:px-28 ">
        <h1 className="text-3xl font-bold text-center mt-20">Skills</h1>
      <div className="w-full md:mx-auto lg:mx-auto flex justify-center flex-wrap items-center mt-7 px-5">
        {data
          ? data.map((skill, _id) => (
              <div
                key={_id}
                className="bg-slate-800/65 rounded-xl w-28 md:w-36 text-center flex justify-center items-center flex-col m-4"
              >
                <img
                  src={skill.skillImage ? skill.skillImage : ""}
                  alt="not found"
                  className="w-20 h-20 object-contain"
                />
                <h1 className="text-center text-white font-semibold text-xl">
                  {skill.skillName ? skill.skillName : "not found"}
                </h1>
              </div>
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default Skills;
