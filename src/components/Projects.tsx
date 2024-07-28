
import axios from "axios";
import { Loader, Loader2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

const Projects = () => {
  const [data, setData] = useState([{
    _id: "",
    projectImage: "",
    projectName: "",
    webLink:""
  }]);
  const [Loading, setLoading] = useState(false)


  const fetchData = useCallback(async () => {
    setLoading(true)
    const response = await axios.get("/api/project/get");
    console.log(response.data.allProjects);
    setData(response.data.allProjects);
    setLoading(false)
  },[])
  
  useEffect(() => {
    fetchData();
  },[])
  
  return Loading ? (
    <h1 className="text-2xl text-center">
      <span>Project loading...</span>
    </h1>
  ) : (
    <div>
      <h1 className="text-center text-3xl font-bold mt-12 mb-6 text-slate-400">
        Projects
      </h1>
      <div className="w-full flex flex-wrap justify-center gap-4 md:gap-10 md:px-28">
        {data &&
          data.map((project, _id) => (
            <div className="w-72 h-48 md:w-[24%] my-5  bg-slate-800 px-2 rounded-xl flex justify-center flex-col">
              <img
                src={project?.projectImage}
                alt="youtubeclone"
                className="w-full h-[70%] object-contain"
              />
              <h1 className="my-2 text-center text-white font-medium tracking-widest">
                {project?.projectName}
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Projects;
