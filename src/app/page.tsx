"use client"
import React, { lazy, Suspense} from "react";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import UploadVisitorMessage from "@/components/Uploads/UploadVisitorMessage";

const page: React.FC = () => {
  const About = lazy(()=> import("@/components/About"))
  const Skills = lazy(()=> import("@/components/Skills"))
  const Projects = lazy(() => import("@/components/Projects"));

  
  return (
    <div>
      <div className="w-full h-full">
        <Nav />
        <Hero />
        <Suspense
          fallback={<h1 className="text-center text-3xl">Loading...</h1>}
        >
          <About />
          <Skills />
          <Projects />
        </Suspense>
        <div className="w-full">
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
