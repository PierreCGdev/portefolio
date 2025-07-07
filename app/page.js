"use client";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CubeBackground from "../components/CubeBackground";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";

export default function Home() {
  const sections = ["Home", "Parcours", "Outil", "Projet"];
  const [activeSection, setActiveSection] = useState("Home");
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;

          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* <div>
        <CubeBackground />
      </div> */}

      <Header
        sections={["Home", "Parcours", "Outil", "Projet"]}
        activeSection={activeSection}
      />
      <main className="relative">
        <section
          id="Home"
          className="h-screen w-screen  bg-white dark:bg-black flex items-center justify-center"
        >
          <h1>Pierre Castanet</h1>
        </section>
        <section
          id="Parcours"
          className="h-screen w-screen  bg-white dark:bg-black flex items-center justify-center"
        >
          <h1>Écran 2</h1>
        </section>
        <section
          id="Outil"
          className="h-screen w-screen  bg-white dark:bg-black flex items-center justify-center"
        >
          <h1>Écran 3</h1>
        </section>
        <section
          id="Projet"
          className="h-screen w-screen  bg-white dark:bg-black flex items-center justify-center"
        >
          <h1>Écran 4</h1>
        </section>
      </main>
      <Footer />
    </div>
  );
}
