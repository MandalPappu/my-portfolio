import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RiDeleteBin6Fill } from "react-icons/ri";
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
import { Button } from "@/components/ui/button";
import { Compare } from "@/components/ui/compare";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";


interface IAbout{
  _id: string;
  aboutData:string
}
const  About = () => {
  const [data, setData] = useState<IAbout | null>(
    {_id:"",
    aboutData:""}
  );
  const userId = useAppSelector((state: RootState) => state.auth.userId);
  const [loading, setLoading] = useState(false);


  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await axios.get("/api/about/get")
      setData(res.data.data);
      setLoading(false)
    } catch (error: any) {
      toast(error.response.data.message)
      setLoading(false);
    }
  }, []);

    useEffect(() => {
      fetchData();
    }, []);
  
      const deleteAboutData = async () => {
        await axios
          .delete("/api/about/delete/delete-aboutData")
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
        setData(null);
  };


  return loading ? (
    <h1 className="text-center text-3xl ">about is Loading...</h1>
  ) : (
    <div className="w-full my-4 md:my-0 sm:px-0 md:pr-20">
      <h1 className="text-3xl text-center font-bold mt-24 mb-6">About</h1>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-1 relative">
        <Compare
          firstImage="https://assets.aceternity.com/code-problem.png"
          secondImage="https://assets.aceternity.com/code-solution.png"
          firstImageClassName="object-cover object-left-top"
          secondImageClassname="object-cover object-left-top"
          className="h-[250px] w-[300px] md:h-[400px] md:w-[500px] sm:ml-10 md:ml-10 lg:ml-24"
          slideMode="hover"
        />
          { data ?
            <div
              key={data?._id}
              className={`w-full px-8 md:w-[40rem] text-2xl leading-relaxed mx-auto text-slate-300`}
            >
              <TextGenerateEffect
                words={data?.aboutData}
                duration={2}
                filter={false}
                className="text-slate-300"
              />
              <span className={`${userId ? "inline" : "hidden"}`}>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>
                      <RiDeleteBin6Fill size={20} color="red" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Do You Want To Delete?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={deleteAboutData}>
                        Delet
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </span>
            </div> : "Fetching..."
}    
      </div>
    </div>
  );
};

export default About;
