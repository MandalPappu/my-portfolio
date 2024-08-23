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
import { Loader } from "lucide-react";


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
  const [processing, setProcessing] = useState(false);
  
  const dataFetch = useCallback(async () => {
    const res = await axios.get("/api/visitorMessage/get");
    setData(res.data.data);
  }, []);
  useEffect(() => {
    dataFetch();
  }, []);

  const deleteMessage = async ({ message }: { message: ImessageData }) => {
    setProcessing(true);
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
    const newdata = data.filter((messageItem) => (messageItem !== message));
    setProcessing(false);
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
                  onClick={(e) =>
                    setMessageId(e.currentTarget.getAttribute("id"))
                  }
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
                          <RiDeleteBin6Fill size={20} color="red" />
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-72 bg-white rounded-2xl md:rounded-2xl  text-black">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Do You Want To Delete Message?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="hover:bg-slate-400 rounded-2xl">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                            onClick={() => deleteMessage({ message })}
                            >
                              <span className="hover:bg-red-400 px-5 py-2.5 rounded-2xl">Delete</span>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </h3>
                  </div>
                  <p className="text-[15px]">
                    message: {message?.visitorMessage}
                  </p>
                </div>
              ))
            : "Loading..."}
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

export default Messages;


