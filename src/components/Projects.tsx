import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

const Projects = () => {
  const [data, setData] = useState([{
    _id: "",
    projectImage: "",
    projectName: "",
    webLink:""
  }]);

  // useMemo(async () => {
    
  // }, [])

  const fetchData = async() => {
    const response = await axios.get("/api/project/get");
    console.log(response.data.allProjects);
    setData(response.data.allProjects);
  }
  
  useEffect(() => {
    fetchData();
  },[])
  
  return (
    <div className="flex flex-wrap justify-center">
      {data && data.map((project, _id) => (
        <div className="w-[24%] m-4 bg-slate-800 px-2 rounded-xl flex justify-center flex-col">
          <img src={project?.projectImage} alt="youtubeclone" className="" />
          <h1 className="my-2 text-center text-white font-medium tracking-widest">{project?.projectName }</h1>
        </div>
      ))}
    </div>
  );
};

export default Projects;
