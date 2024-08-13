import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
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
import { toast } from "react-toastify";


interface ImessageData {
  _id: string;
  visitorName: string;
  visitorEmail: string;
  visitorMessage: string;
  createdAt: string;
}

const Messages:React.FC = () => {
  const [data, setData] = useState<ImessageData[] | []>([{
    _id: "",
  visitorName: "",
  visitorEmail: "",
  visitorMessage: "",
  createdAt: ""
  }]);
  const [messageId, setMessageId] = useState<string | null | undefined>("");

  
  const dataFetch = useCallback(async () => {
    const res = await axios.get("/api/visitorMessage/get");
    setData(res.data.data);
  }, []);
  useEffect(() => {
    dataFetch();
  }, []);

    const deleteMessage = async ({ message }: { message: ImessageData }) => {
      await axios
        .post("/api/visitorMessage/delete", { id: messageId })
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
      const newdata = data.filter((messageItem) =>( messageItem !== message));
      setData(newdata);
    };
  

    return (
      <div>
        <div className="w-96 mx-auto flex flex-col gap-2 h-60 overflow-y-scroll">
          {data
            ? data.map((message, index) => (
              <div
                id={message?._id}
                key={index}
                onClick={(e)=>setMessageId(e.currentTarget.getAttribute("id"))}
                  className="w-96 bg-slate-800 relative rounded-xl inline-block px-4 font-medium"
                >
                  <div className="flex justify-between gap-1">
                    <h1 className="text-xs">{message?.visitorName}</h1>
                    <h2 className="text-xs">{message?.visitorEmail}</h2>
                    <p className="text-xs">
                      {moment(message?.createdAt).fromNow()}
                    </p>
                    <h3 className="my-2">
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <RiDeleteBin6Fill size={20} color="red"/>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Do You Want To Delete Message?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={()=>deleteMessage({message})}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </h3>
                  </div>
                  <p className="text-[15px]">message: {message?.visitorMessage}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    );
};

export default Messages;


