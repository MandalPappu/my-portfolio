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
import CarousalImage from "./CarousalImag";
import { Loader } from "lucide-react";

interface Iproject {
  _id: string;
  projectImages: string[];
  projectName: string;
  weblink: string;
}
const Projects = () => {
  const [data, setData] = useState<Iproject[] | []>([
    {
      _id: "",
      projectImages: [],
      projectName: "",
      weblink: "",
    },
  ]);
  const [Loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState<string | null | undefined>("");
  const [processing, setProcessing] = useState(false)
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

  const deleteProject = async ({ project }: { project: Iproject }) => {
    setProcessing(true);
    await axios
      .post("/api/project/delete", { id: projectId })
      .then((res) =>
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 1000,
          className: "mx-8 mt-6",
        })
      )
      .catch((err) =>
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 1000,
          className: "mx-8 mt-6",
        })
      );
    const newdata = data.filter((item) => item !== project);
    setProcessing(false);
    setData(newdata);
  };

  return Loading ? (
    <h1 className="text-2xl text-center my-20">
      <span>Project loading...</span>
    </h1>
  ) : (
    <div className={`${data.length > 0 ? "block" : "hidden"}`}>
      <h1 className="w-32 mx-auto text-3xl text-center font-bold mt-24 mb-6 border-b-4 rounded-2xl py-3">
        Projects
      </h1>
      <div className="w-full relative flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-10 sm:px-16 lg:px-28 mt-6 mx-auto">
        {processing ? (
          <div className="absolute top-8 z-50 flex items-center gap-4 bg-white rounded-2xl py-5 text-black">
            <div>
              <Loader size={32} className="animate-spin mx-2" />
            </div>
            <h2 className="text-2xl">please wait...</h2>
          </div>
        ) : (
          ""
        )}
        {data &&
          data.map((project, index) => (
            <CardContainer
              key={index}
              className="object-cover rounded-2xl px-2 relative"
            >
              <CardBody className="w-[80%] h-[23rem] sm:w-[20rem] sm:h-[25rem] group/card hover:shadow-emerald-500 shadow-2xl dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl border-[1px] border-slate-700 ">
                <div
                  id={project?._id}
                  key={index}
                  onClick={(e) =>
                    setProjectId(e.currentTarget.getAttribute("id"))
                  }
                  className="w-full flex flex-col"
                >
                  <CardItem translateZ="100" className="w-full relative">
                    <CarousalImage imgData={project?.projectImages} />
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <div
                          className={`${
                            userId ? "block" : "hidden"
                          } w-[90%] h-40 absolute top-4 right-2`}
                        ></div>
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
                          <AlertDialogCancel className="rounded-2xl hover:bg-slate-400">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteProject({ project })}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardItem>
                  <div className="flex justify-center items-center gap-4 mt-2">
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
                            : project.projectImages
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
