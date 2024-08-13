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
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { RxCross2 } from "react-icons/rx";


interface Iproject {
  _id: string;
  projectImage: string;
  projectName: string;
  weblink: string;
}
const Projects = () => {
  const [data, setData] = useState<Iproject[] | []>([
    {
      _id: "",
      projectImage: "",
      projectName: "",
      weblink: "",
    },
  ]);

  const [Loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState<string | null | undefined>("");
  const userId = useAppSelector((state: RootState) => state.auth.userId);


  const fetchData = useCallback(async () => {
    setLoading(true);
    const response = await axios.get("/api/project/get");
    setData(response.data.allProjects);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const deleteProject = async ({project}:{project:Iproject}) => {
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
    const newdata = data.filter((item) => item !== project);
    setData(newdata);
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
          data.map((project, index) => (
            <CardContainer
              key={index}
              className="object-cover rounded-2xl px-2"
            >
              <CardBody className="w-[20rem] flex justify-center mx-auto group/card hover:shadow-emerald-500 shadow-2xl dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl p-6  border-[1px] border-slate-700 ">
                <div
                  id={project?._id}
                  key={index}
                  onClick={(e) =>
                    setProjectId(e.currentTarget.getAttribute("id"))
                  }
                  className="flex justify-center items-center flex-col"
                >
                  <CardItem translateZ="100" className="relative mt-20">
                    <img
                      src={`${project?.projectImage}`}
                      className="object-fill w-60  group-hover/card:shadow-xl px-2"
                      alt="thumbnail of projects"
                    />
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <div className={`${userId ? "block" : "hidden"} bg-transparent w-full h-full absolute top-4 right-4 left-2`}>
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="w-[80%] bg-slate-300 text-black rounded-2xl sm:rounded-2xl mx-auto">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Do You Want To Delete?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-2xl hover:bg-slate-400">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteProject({ project })}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardItem>
                  <div className="flex justify-between items-center gap-3 my-20">
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
                      className="cursor-pointer "
                    >
                      <Link
                        href={`${
                          project.weblink
                            ? project.weblink
                            : project.projectImage
                        }`}
                        target="_blank"
                        className="px-4 py-0 cursor-pointer rounded-xl text-xl font-normal bg-slate-300 text-black"
                      >
                        see
                      </Link>
                    </CardItem>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          ))}
      </div>
    </div>
  );
};

export default Projects;
