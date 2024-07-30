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


const Skills = () => {
  const [data, setData] = useState([
    {_id:"", skillImage:"", skillName:""}
  ]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

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

  console.log("div id:", id);
  
  // const deleteAboutData = async () => {

  //         await axios
  //           .delete("/api/skill/delete", {data})
  //           .then((res) =>
  //             toast.success(res.data.message, {
  //               position: "top-center",
  //               autoClose: 2000,
  //             })
  //           )
  //           .catch((err) =>
  //             toast.error(err.response.data.message, {
  //               position: "top-center",
  //               autoClose: 2000,
  //             })
  //           );
  //       };
  
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
              <AlertDialog open={false}>
                <AlertDialogTrigger>
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
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default Skills;
