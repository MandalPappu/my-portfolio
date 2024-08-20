'use client'
import Admin from "@/components/Admin";
import axios from "axios";
import { headers } from "next/headers";
import { ChangeEvent, FormEvent, HTMLInputTypeAttribute, MouseEvent, useState } from "react";

const page = () => {
  const [name, setName] = useState("")
  const [Image, setImage] = useState<FileList | null>(null)
  

  const handleSubmit = (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(!Image) return null
    const formData = new FormData();
    formData.append("name", name);
    for (let i = 0; i < Image.length; i++) {
      formData.append("Image", Image[i]); 
    }
    axios.post("/api/carousel", formData)
  }
  return (
    <div className="w-full h-full">
      <Admin />
      {/* <div>
        <h1 className="text-3xl font-bold">upload Images</h1>
          <input type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <input
            type="file"
            id="file"
            name="file"
            multiple={true}
            maxLength={2}
            onChange={(e)=>setImage(e.target?.files)}
          />
          <button onClick={handleSubmit}>click</button>
      </div> */}
    </div>
  );
};

export default page;
