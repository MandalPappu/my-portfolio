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
import { BackgroundGradient } from "./ui/background-gradient";

const Skills = () => {
  const [data, setData] = useState([
    {_id:"", skillImage:"", skillName:""}
  ]);
  const [loading, setLoading] = useState(false);
  const [skillId, setSkillId] = useState<string | null | undefined>("");
  const [hideSkillItem, setHideSkillItem] = useState(false);

    const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/skill/get")
      console.log('skills array:', res.data.allSkills);
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

  console.log("div id:", {skillId});
  
  const deleteSkill = async () => {
          await axios
            .post("/api/skill/delete", {id:skillId})
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
    setHideSkillItem(true);
  };
  

  return loading ? (
    <h1 className="text-center text-3xl text-slate-400">
      Skills are loading...
    </h1>
  ) : (
    <div className="w-full text-center sm:px-28 ">
      <h1 className="text-3xl font-bold text-center mt-20">Skills</h1>
      <div className="w-full md:mx-auto lg:mx-auto flex justify-center flex-wrap items-center mt-7 px-5">
        {data &&
          data.map((skill) => (
            <AlertDialog>
              <AlertDialogTrigger>
                <div
                  id={skill?._id}
                  key={skill?._id}
                  onClick={(e) =>
                    setSkillId(e.currentTarget.getAttribute("id"))
                  }
                  className={`rounded-xl w-28 md:w-36 text-center flex justify-center items-center flex-col m-4`}
                >
                  <BackgroundGradient className="w-24 p-1 dark:bg-zinc-900">
                    <div className="bg-slate-800 rounded-2xl flex justify-center items-center flex-col">
                      <img
                        src={
                          skill.skillImage
                            ? skill.skillImage
                            : "skill not found"
                        }
                        alt="skill-image"
                        className="w-20 h-20 object-contain"
                      />
                      <h1 className="text-center text-white font-semibold text-xl">
                        {skill.skillName ? skill.skillName : ""}
                      </h1>
                    </div>
                  </BackgroundGradient>
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
                  <AlertDialogAction onClick={deleteSkill}>
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

export default Skills;
