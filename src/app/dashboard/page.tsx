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
    </div>
  );
};

export default page;
