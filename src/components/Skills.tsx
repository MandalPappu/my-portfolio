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
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import CircleSpinner from "./CircleSpinner";
import { Span } from "next/dist/trace";
import { Loader } from "lucide-react";

interface ISkill {
  _id: string;
  skillImage: string;
  skillName: string;
}

const Skills = () => {
  const [data, setData] = useState<ISkill[] | []>([
    { _id: "", skillImage: "", skillName: "" },
  ]);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skillId, setSkillId] = useState<string | null>("");
  // const [deleteOptionShow, setDeleteOptionShow] = useState(false);
  const userId = useAppSelector((state: RootState) => state.auth.userId);

  // if (userId) return setDeleteOptionShow(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/skill/get");
      console.log(res.data.allSkills);

      setData(res.data.allSkills);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  const deleteSkill = async ({ skill }: { skill: ISkill }) => {
    setProcessing(true);
    await axios
      .post("/api/skill/delete", { id: skillId })
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
    const newdata = data.filter((item) => item !== skill);
    setData(newdata);
    setProcessing(false);
  };

  return loading ? (
    <h1 className="text-center text-3xl text-slate-400 my-20">
      Skills are loading...
    </h1>
  ) : (
    <div
      className={`w-full text-center sm:px-28 ${
        data.length > 0 ? "block" : "hidden"
      }`}
    >
      <h1 className="w-32 mx-auto text-3xl text-center font-bold mt-24 mb-6 border-b-4 rounded-2xl py-3">
        Skills
      </h1>
      <div className="w-full md:mx-auto lg:mx-auto flex justify-center flex-wrap items-center mt-7 px-5">
        {data
          ? data.map((skill, index) => (
              <div
                id={skill?._id}
                key={index}
                onClick={(e) => setSkillId(e.currentTarget.getAttribute("id"))}
                className={`rounded-xl relative w-28 md:w-36 text-center flex justify-center items-center flex-col m-4`}
              >
                <BackgroundGradient className="w-24 p-1">
                  <div className="bg-black/75 relative rounded-2xl flex justify-center items-center flex-col">
                    <img
                      src={
                        skill?.skillImage ? skill.skillImage : "skill not found"
                      }
                      alt="skill-image"
                      className="w-20 h-20 object-contain mt-2"
                    />
                    <h1 className="text-center text-white font-semibold text-normal px-1">
                      {skill.skillName ? skill.skillName : "not found"}
                    </h1>
                    <div className="w-full h-full rounded-2xl z-50">
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <div
                            className={`${
                              userId ? "block" : "hidden"
                            } w-full h-full rounded-2xl z-50 absolute bottom-4 right-3`}
                          ></div>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-[80%] bg-slate-300 text-black rounded-2xl sm:rounded-2xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Do You Want To Delete?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="px-4 py-2 rounded-xl hover:bg-slate-400">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteSkill({ skill })}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </BackgroundGradient>
              </div>
            ))
          : "not found"}
        {processing ? (
          <div className="absolute z-50 flex items-center gap-4 bg-white rounded-2xl py-5 text-black">
            <div>
              <Loader size={32} className="animate-spin mx-2" />
            </div>
            <h2 className="text-2xl">please wait...</h2>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Skills;
