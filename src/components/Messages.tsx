import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface ImessageData {
  _id: string;
  visitorName: string;
  visitorEmail: string;
  visitorMessage: string;
}

const Messages:React.FC = () => {
  const [data, setData] = useState<ImessageData[] | undefined>([]);

  
  const dataFetch = useCallback(async () => {
    const res = await axios.get("/api/visitorMessage/get");
    console.log(res.data);
    setData(res.data.data);
  }, []);
  useEffect(() => {
    dataFetch();
  },[])
  

    return (
      <div className="inline-block bg-slate-950 hover:bg-slate-900">
        <div className="flex flex-col gap-2 h-40 overflow-y-scroll">
          {data
            ? data.map((item, _id) => (
                <div key={_id} className="bg-zinc-500 inline-block px-4 rounded-md text-black font-medium">
                  <div className="flex justify-between gap-1 ">
                    <h1>{item.visitorName}</h1>
                    <h2>{item.visitorEmail}</h2>
                  </div>
                <p>message: {item.visitorMessage }</p>
                </div>
              ))
            : "<h1>Loading...</h1>"}
        </div>
      </div>
    );
};

export default Messages;
