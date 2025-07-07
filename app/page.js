"use client";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CubeBackground from "../components/CubeBackground";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import ThemeProvider from "../components/ThemeProvider";
import { CircleArrowDown } from "lucide-react";
import Button from "../components/Button";

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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
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
            className="h-screen w-screen  bg-white dark:bg-black flex flex-col items-start justify-center p-13 md:p-30 xl:p-50"
          >
            <div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-bold bg-[linear-gradient(60deg,_rgb(44,_162,_180),_rgb(85,_152,_222),_rgb(127,_135,_255),_rgb(246,_90,_173),_rgb(236,_61,_67))]  bg-clip-text text-transparent">
                Pierre Castanet
              </h1>
              <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-bold">
                <span className="text-neutral-400">développeur</span> full stack
              </h1>
            </div>

            {/* <CircleArrowDown size={80} strokeWidth={1} /> */}
          </section>
          <section
            id="Parcours"
            className="h-screen w-screen  bg-white dark:bg-black flex flex-col items-start justify-center p-13 md:p-30 xl:p-50"
          >
            <div className="flex flex-col items-start">
              <h2 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-bold bg-[linear-gradient(60deg,_rgb(44,_162,_180),_rgb(85,_152,_222),_rgb(127,_135,_255),_rgb(246,_90,_173),_rgb(236,_61,_67))]  bg-clip-text text-transparent">
                mon parcours
              </h2>
              <h3 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-bold">
                <span className="text-neutral-400">de motion designer à </span>
                développeur
              </h3>
              <p className="text-md sm:text-xl md:text-2xl xl:text-3xl mt-5">
                Issu du monde du{" "}
                <span className="font-bold">motion design</span>, j’ai découvert{" "}
                <span className="font-bold">JavaScript</span> en créant des
                scripts pour automatiser des animations sur After Effects. Cette
                première immersion dans le code a été un vrai déclic : j’y ai
                retrouvé le même plaisir créatif qu’en animation, mais avec une
                <span className="font-bold"> logique</span> et une
                <span className="font-bold"> rigueur</span> qui m’ont tout de
                suite captivé. J’ai ensuite approfondi mes compétences avec{" "}
                <span className="font-bold">React</span>, et là, j’ai su que
                j’étais à ma place. Le développement web est devenu pour moi un
                terrain d’expression à part entière, mêlant technique et
                créativité.
              </p>
              <Button
                text="LinkedIn"
                link="https://fr.linkedin.com/in/pierre-castanet-4b489493"
              />
            </div>
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
    </ThemeProvider>
  );
}
