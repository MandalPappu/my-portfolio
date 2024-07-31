import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Projects = () => {
  const [data, setData] = useState([{
    _id: "",
    projectImage: "",
    projectName: "",
    webLink:""
  }]);
  const [Loading, setLoading] = useState(false)
  const [projectId, setProjectId] = useState<string | null | undefined>("");


  const fetchData = useCallback(async () => {
    setLoading(true)
    const response = await axios.get("/api/project/get");
    console.log(response.data.allProjects);
    setData(response.data.allProjects);
    setLoading(false)
  },[])
  
  useEffect(() => {
    fetchData();
  }, []);

  const deleteProject = async () => {
    await axios
      .post("/api/project/delete", { id: projectId })
      .then((res) =>
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 2000,
        })
      )
      .catch((err) =>
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 2000,
        })
      );

  };

  
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
          data.map((project) => (
            <AlertDialog>
              <AlertDialogTrigger>
                <div
                  id={project?._id}
                  key={project?._id}
                  onClick={(e) =>
                    setProjectId(e.currentTarget.getAttribute("id"))
                  }
                  className="w-72 h-48 my-5  bg-slate-800 px-2 rounded-xl flex justify-center flex-col"
                >
                  <img
                    src={project?.projectImage}
                    alt="youtubeclone"
                    className="w-full h-[70%] object-contain"
                  />
                  <h1 className="my-2 text-center text-white font-medium tracking-widest">
                    {project?.projectName}
                  </h1>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Do You Want To Delete?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteProject}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ))}
      </div>
    </div>
  );
};

export default Projects;
