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

const  About = () => {
  const [data, setData] = useState({
    _id:"",
    aboutData:""
  });
  const [showDeleteFn, setShowDeleteFn] = useState(false)
  const [loading, setLoading] = useState(false);
  


  const fetchData = useCallback(async() => {
    try {
      setLoading(true)
      const res = await axios.get("/api/about/get")
      console.log("about:", res.data)
      
      setData(res.data.data);
      setLoading(false)
    } catch (error:any) {
      toast(error.response.data.message)
      setLoading(false);
    }
  }, [])
  
  useEffect(() => {
    fetchData()
  }, [])
  
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
      };

  return loading ? (
    <h1 className="text-center text-3xl ">about is Loading...</h1>
  ) : (
    <div className="w-full my-4 md:my-0 sm:px-0 md:pr-20">
      <h1 className="text-3xl text-center font-bold mt-24 mb-6">About</h1>
      <div className=" sm:flex sm:justify-between sm:items-center sm:gap-4 relative">
        <img
          src="../../boyicon.webp"
          alt="about icon"
          className="hidden md:block w-[40rem] h-96"
        />
        {data ? (
          <p
            key={data?._id}
            className="w-[70%] text-3xl leading-relaxed mx-auto"
          >
            {data?.aboutData}
            <span>
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
          </p>
        ) : (
          <h1 className="w-full  text-center font-bold text-xl">Not Found! please try again...</h1>
        )}
      </div>
    </div>
  );
};

export default About;
