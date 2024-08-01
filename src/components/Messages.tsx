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
  const [data, setData] = useState<ImessageData[] | undefined>([]);
  const [messageId, setMessageId] = useState<string | null | undefined>("");

  
  const dataFetch = useCallback(async () => {
    const res = await axios.get("/api/visitorMessage/get");
    console.log(res.data);
    setData(res.data.data);
  }, []);
  useEffect(() => {
    dataFetch();
  }, []);

    const deleteMessage = async () => {
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
    };
  

    return (
      <div className="inline-block bg-transparent">
        <div className="w-[40rem] flex flex-col gap-2 h-40 overflow-y-scroll">
          {data
            ? data.map((item) => (
              <div
                id={item?._id}
                key={item?._id}
                onClick={(e)=>setMessageId(e.currentTarget.getAttribute("id"))}
                  className="w-96 bg-slate-800 relative rounded-xl inline-block px-4 font-medium"
                >
                  <div className="flex justify-between gap-1">
                    <h1 className="text-xs">{item?.visitorName}</h1>
                    <h2 className="text-xs">{item?.visitorEmail}</h2>
                    <p className="text-xs">
                      {moment(item?.createdAt).fromNow()}
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
                            <AlertDialogAction onClick={deleteMessage}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </h3>
                  </div>
                  <p className="text-[15px]">message: {item?.visitorMessage}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    );
};

export default Messages;


