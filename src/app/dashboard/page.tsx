"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const page = () => {
  const [skillName, setSkillName] = useState("");
  const [skillImage, setSkillImage] = useState<File | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [getSkill, setGetSkill] = useState<any>();

  const router = useRouter();

  const onSubmitSkillHandler = async () => {
    try {
      if (!skillImage || !skillName) return;
      const formData = new FormData();
      formData.append("skillImage", skillImage);
      formData.append("skillName", skillName);
      const res = await axios.post("api/skill/add", formData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSkillData = useCallback(async () => {
    console.log("option is clicked");

    await axios
      .get("api/skill/get")
      .then((res) => res.data)
      .then((data) => setGetSkill(data));
  }, []);
  useEffect(() => {
    fetchSkillData();
  }, []);

  const deleteSkill = async () => {};

  const onSubmitProjectHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!projectImage || !projectName) return;
      const formData = new FormData();
      formData.append("projectImage", projectImage);
      formData.append("projectName", projectName);
      const res = await axios.post("api/project/add", formData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitResumeHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!resume) return;
      const formData = new FormData();
      formData.append("resume", resume);
      const res = await axios.post("api/add", formData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = async() => {
    await axios.delete("/api/logout")
      .then((res) => {
        toast.success(res.data.message, { position: "top-center", autoClose: 3000 })
        router.push("/login")
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center", autoClose: 300
        })
      })
  }
  return (
    <div className="w-full h-screen md:h-full  bg-slate-950 text-slate-400 md:px-[10rem] px-4">
      <nav className="flex my-2 py-2 bg-slate-900 justify-between px-4 rounded-xl">
        <h1 className="text-3xl font-bold">Pappu</h1>
        <button onClick={logoutHandler} className="text-xl font-bold bg-slate-950 rounded-2xl px-4 hover:bg-slate-500 hover:text-black">
          Logout
        </button>
      </nav>
      <h1 className="text-center font-bold text-2xl md:text-4xl py-4">
        Admin Dashboard
      </h1>
      <div className="flex justify-center md:justify-between items-center md:gap-2">
        <div className="my-10 w-full md:w-1/2">
          <h1 className="text-2xl font-semibold w-full">
            username:{" "}
            <span className="font-bold text-3xl text-rose-200">
              pappumandal
            </span>
          </h1>
          <div className="flex flex-col my-4">
            <h1 className="text-2xl font-semibold my-2">
              uploads yours skills...
            </h1>
            <form>
              <input
                type="text"
                placeholder="skill name's..."
                value={skillName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  setSkillName(e.target.value);
                }}
                className="px-2 w-full md:w-56 py-1 rounded-md my-2 bg-slate-500/15 outline-none text-xl placeholder:text-base"
              />
              <input
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSkillImage(e.target.files ? e.target.files[0] : null)
                }
                className="px-2 py-1 rounded-2xl my-2"
              />
            </form>
            <div className="flex gap-2 items-center">
              <button
                onClick={onSubmitSkillHandler}
                className="w-full md:inline hover:bg-green-950 hover:text-white transition-colors md:w-28 px-6 py-2 font-semibold text-base bg-green-500 text-black rounded-lg cursor-pointer"
              >
                upload
              </button>
              <div className="mx-10">
                <button className="w-full md:inline hover:bg-green-950 hover:text-white transition-colors md:w-28 px-6 py-2 font-semibold text-base bg-green-500 text-black rounded-lg cursor-pointer">
                  allSkills
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col my-4">
            <h1 className="text-2xl font-semibold my-2">
              uploads yours projects...
            </h1>
            <form onSubmit={onSubmitProjectHandler}>
              <input
                type="text"
                placeholder="project name's..."
                value={projectName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  setProjectName(e.target.value);
                }}
                className="px-2 w-full md:w-56 py-1 rounded-md my-2 bg-slate-500/15 outline-none text-xl placeholder:text-base"
              />
              <input
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setProjectImage(e.target.files ? e.target.files[0] : null)
                }
                className=" px-2 py-1 rounded-2xl my-2"
              />
              <button className="w-full hover:bg-green-950 hover:text-white transition-colors md:w-28 px-6 py-2 font-semibold text-base bg-green-500 text-black rounded-lg cursor-pointer">
                upload
              </button>
            </form>
          </div>
          <div className="flex flex-col my-4">
            <h1 className="text-2xl font-semibold my-2">
              uploads yours resume...
            </h1>
            <form onSubmit={onSubmitResumeHandler}>
              <input
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setResume(e.target.files ? e.target.files[0] : null)
                }
                className=" px-2 py-1 rounded-2xl my-2"
              />
              <button className="w-full hover:bg-green-950 hover:text-white transition-colors md:w-28 px-6 py-2 font-semibold text-base bg-green-500 text-black rounded-lg cursor-pointer">
                upload
              </button>
            </form>
          </div>
        </div>
        <div className="w-1/2 h-full hidden md:block">
          <img src="../boyicon.webp" alt="boy" className="w-[90%] mb-52" />
        </div>
      </div>
      <div>
        <h1 className="text-center font-bold text-2xl md:text-4xl">
          Contact person
        </h1>
        <div className="py-4">
          <div className="bg-slate-700/10 w-full md:w-1/2 text-center mx-auto my-4 rounded-lg p-4">
            <h1 className="text-2xl font-semibold">John Doe</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              dicta culpa repellat nisi. Voluptas soluta corporis, dolore at
              illo perferendis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
