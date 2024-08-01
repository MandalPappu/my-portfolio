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

import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

const Projects = () => {
  const [data, setData] = useState([
    {
      _id: "",
      projectImage: "",
      projectName: "",
      webLink: "",
    },
  ]);
  const [Loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState<string | null | undefined>("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const response = await axios.get("/api/project/get");
    console.log(response.data.allProjects);
    setData(response.data.allProjects);
    setLoading(false);
  }, []);

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
      <div className="w-full flex flex-wrap justify-center md:gap-6 lg:gap-10 sm:px-16 lg:px-28">
        {data &&
          data.map((project) => (
            <AlertDialog>
              <AlertDialogTrigger>
                <CardContainer className="inter-var object-cover rounded-2xl px-2">
                  <CardBody className="w-[20rem] bg-[#040712f1] flex justify-center mx-auto relative group/card hover:shadow-emerald-500 shadow-2xl dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl p-6  border-[1px] border-slate-700 ">
                    <div
                      id={project?._id}
                      key={project?._id}
                      onClick={(e) =>
                        setProjectId(e.currentTarget.getAttribute("id"))
                      }
                      className="flex justify-center items-center flex-col"
                    >
                      <CardItem translateZ="100" className="object-cover">
                        <Image
                          src={project?.projectImage}
                          height="300"
                          width="300"
                          className="object-contain rounded-xl group-hover/card:shadow-xl px-2"
                          alt="thumbnail"
                        />
                      </CardItem>
                      <div className="flex justify-between items-center gap-3 mt-20">
                        <CardItem
                          translateZ={20}
                          translateX={-40}
                          className="px-4 py-2 rounded-xl text-2xl font-normal dark:text-white"
                        >
                          {project?.projectName}
                        </CardItem>
                        <CardItem
                          translateZ={20}
                          translateX={-40}
                          className="px-4 py-2 rounded-xl text-2xl font-normal"
                        >
                          <button className="bg-slate-300 h-8 px-5 rounded-2xl py-1 text-black font-semibold text-xs">
                            see
                          </button>
                        </CardItem>
                      </div>
                    </div>
                  </CardBody>
                </CardContainer>
                {/* <img
                    src=''
                    alt="youtubeclone"
                    className="w-full h-[70%] object-contain"
                  />
                  <h1 className="my-2 text-center text-white font-medium tracking-widest">
                    {}
                  </h1> */}
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
