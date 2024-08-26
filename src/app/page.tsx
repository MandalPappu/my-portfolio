"use client"
import React, { lazy, Suspense} from "react";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import UploadVisitorMessage from "@/components/Uploads/UploadVisitorMessage";

const page = () => {
  const About = lazy(()=> import("@/components/About"))
  const Skills = lazy(()=> import("@/components/Skills"))
  const Projects = lazy(() => import("@/components/Projects"));

  
  return (
    <div>
      <div className="w-full h-full relative">
        <div className="w-full top-0 fixed bg-slate-700/50 sm:bg-transparent shadow-3xl z-50">
          <Nav />
        </div>
        <Hero />
        <Suspense
          fallback={<h1 className="text-center text-3xl">Loading...</h1>}
        >
          <div id="About">
            <About />
          </div>
          <div id="Skills">
            <Skills />
          </div>
          <div id="Projects">
            <Projects />
          </div>
        </Suspense>
        <div id="Contact" className="w-full">
          <UploadVisitorMessage />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default page;
