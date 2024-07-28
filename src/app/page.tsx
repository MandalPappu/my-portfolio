'use client'
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Contact from "@/components/Uploads/UploadVisitorMessage";
import React, { lazy, Suspense } from "react";


const page: React.FC = () => {
  const About = lazy(()=> import("@/components/About"))
  const Skills = lazy(()=> import("@/components/Skills"))
  const Projects = lazy(() => import("@/components/Projects"));
  return (
    <div className="w-full h-full">
      <Nav />
      <Hero />
      <Suspense fallback={<h1 className="text-center text-3xl">Loading...</h1>}>
        <About />
        <Skills />
        <Projects />
      </Suspense>
      <Contact />
      <Footer/>
    </div>
  );
};

export default page;
