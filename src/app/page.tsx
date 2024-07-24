"use client";
import About from "@/components/About";
import Contact from "@/components/Uploads/UploadVisitorMessage";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="w-full h-full bg-slate-950 text-slate-600">
      <section className="w-full h-screen md:px-[10rem]">
        <div className="w-full py-4">
          <Nav />
        </div>
        <Hero />
      </section>
      <section id="About" className="w-full md:px-[10rem]">
        <h1 className="text-center font-bold text-2xl md:text-4xl text-slate-400">
          About
        </h1>
        <div className="flex justify-between items-center gap-4">
          <img src="../boyicon.webp" alt="men" className="w-64 md:w-[40%]" />
          <div>
            <About />
          </div>
        </div>
      </section>
      <section id="Skills" className="w-full py-6 md:px-[10rem]">
        <div>
          <h1 className="text-center font-bold text-5xl text-gray-400 my-3">
            Skills
          </h1>
          <Skills />
        </div>
      </section>
      <section id="Projects" className="w-full py-6 md:px-[10rem]">
        <div>
          <h1 className="text-center font-bold text-5xl text-gray-400 my-3">
            Projects
          </h1>
          <Projects />
        </div>
      </section>
      <section id="Contact">
        <Contact />
      </section>
      <footer>
        <Footer />
      </footer>
    </main>
  );
}
