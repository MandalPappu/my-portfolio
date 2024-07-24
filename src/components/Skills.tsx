import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const Skills = () => {
  const [data, setData] = useState([
    {_id:"", skillImage:"", skillName:""}
  ]);
  const [loading, setLoading] = useState(false);

    useMemo(async () => {
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


  // useEffect(() => {
  //   fetchData();
  //   setLoading(false);
  // }, []);
  
  return loading ? <h1 className="text-center text-3xl text-slate-400">Skills are loading...</h1> : (
    <div className="flex justify-center items-center flex-wrap">
      {data ?
        data.map((skill, _id) => (
          <div key={_id} className="bg-slate-800/65 rounded-lg w-36 text-center flex justify-center items-center flex-col m-4">
            <img src={skill.skillImage ? skill.skillImage : ""} alt="not found" className="w-20 h-20" />
            <h1 className="text-center text-white font-semibold text-xl">
              {skill.skillName ? skill.skillName : "not found"}
            </h1>
          </div>
        )) : "<h1>Loading...</h1>"}
    </div>
  );
};

export default Skills;
