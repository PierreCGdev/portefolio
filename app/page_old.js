"use client";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CubeBackground from "../components/CubeBackground";
import CubeBgHome from "../components/CubeBgHome";
import { useState, useEffect, useRef } from "react";
import ThemeProvider from "../components/ThemeProvider";
import Button from "../components/Button";
import MotionReveal from "../components/motionReveal";
import CanvasReveal from "../components/CanvasReveal";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { PerformanceMonitor } from "@react-three/drei";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const sections = ["Home", "Projet", "Parcours", "Outil"];
  const [activeSection, setActiveSection] = useState("Home");

  const yScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      yScroll.current = window.scrollY;
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
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div>
        {/* <div className="fixed inset-0 w-full h-full">
          <Canvas shadows camera={{ position: [0, 0, 20], fov: 30 }}>
            <ambientLight intensity={4} color={"#ffffff"} />
            <directionalLight
              color={"#ffffff"}
              position={[0, 10, 10]}
              intensity={4}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-left={-20}
              shadow-camera-right={20}
            />
            <CubeBackground scrollY={yScroll} />
          </Canvas>
        </div> */}

        <Header sections={sections} activeSection={activeSection} />
        <main className="relative">
          {/* home */}
          <section
            id="Home"
            className="h-[100dvh] relative snap-start"
            style={{ pointerEvents: "none" }}
          >
            <div className="relative z-10 h-full w-full  flex flex-col items-start justify-center p-13 md:p-30 xl:p-50">
              <MotionReveal delay={0.25}>
                <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-bold text-green-400">
                  Pierre Castanet
                </h1>
                {/* <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-bold bg-[linear-gradient(60deg,_rgb(44,_162,_180),_rgb(85,_152,_222),_rgb(127,_135,_255),_rgb(246,_90,_173),_rgb(236,_61,_67))]  bg-clip-text text-transparent">
                  Pierre Castanet
                </h1> */}
              </MotionReveal>
              <MotionReveal delay={0.5}>
                <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-bold">
                  <span className="text-neutral-400">de motion designer à</span>{" "}
                  développeur full stack
                </h1>
              </MotionReveal>
            </div>
            <div className="absolute inset-0 h-full w-full">
              <CanvasReveal>
                <Canvas shadows camera={{ position: [0, 0, 29], fov: 22 }}>
                  <ambientLight intensity={4} color={"#ffffff"} />
                  <directionalLight
                    color={"#ffffff"}
                    position={[0, 10, 10]}
                    intensity={4}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-left={-20}
                    shadow-camera-right={20}
                  />
                  <CubeBgHome />
                </Canvas>
              </CanvasReveal>
            </div>
          </section>
          {/* projets */}
          <section id="Projet" className="h-[100dvh] relative snap-start">
            <div className="relative z-10 hh-full w-full  flex flex-col items-center justify-center p-13 md:p-30 xl:p-50">
              <MotionReveal delay={0.25}>
                <h2 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-bold text-green-400">
                  Mes projets
                </h2>

                {/* <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-bold bg-[linear-gradient(60deg,_rgb(44,_162,_180),_rgb(85,_152,_222),_rgb(127,_135,_255),_rgb(246,_90,_173),_rgb(236,_61,_67))]  bg-clip-text text-transparent">
                  Pierre Castanet
                </h1> */}
              </MotionReveal>
              <div className="flex flex-row m-10">
                {/* <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard /> */}
              </div>
            </div>
          </section>
          <section id="Parcours" className="h-[100dvh] relative snap-start">
            <div className="relative flex flex-col items-end justify-center p-13 md:p-30 xl:p-50 z-10">
              <div className="flex flex-row">
                <Image
                  src="/images/portrait.jpg"
                  alt="Pierre Castanet"
                  width={300}
                  height={300}
                />
                <div className="ml-10">
                  <MotionReveal delay={0.15}>
                    <h2 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-bold bg-[linear-gradient(60deg,_rgb(44,_162,_180),_rgb(85,_152,_222),_rgb(127,_135,_255),_rgb(246,_90,_173),_rgb(236,_61,_67))]  bg-clip-text text-transparent">
                      mon parcours
                    </h2>
                  </MotionReveal>
                  <MotionReveal delay={0.3}>
                    <div>
                      <h3 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mt:10">
                        <span className="text-neutral-400">
                          de motion designer à{" "}
                        </span>
                        développeur
                      </h3>
                    </div>
                  </MotionReveal>
                </div>
              </div>
              <MotionReveal delay={0.45}>
                <p className="text-md sm:text-xl md:text-2xl xl:text-3xl mt-10">
                  Issu du monde du{" "}
                  <span className="font-bold">motion design</span>, j’ai
                  découvert <span className="font-bold">JavaScript</span> en
                  créant des scripts pour automatiser des animations sur After
                  Effects. Cette première immersion dans le code a été un vrai
                  déclic : j’y ai retrouvé le même plaisir créatif qu’en
                  animation, mais avec une
                  <span className="font-bold"> logique</span> et une
                  <span className="font-bold"> rigueur</span> qui m’ont tout de
                  suite captivé. J’ai ensuite approfondi mes compétences avec{" "}
                  <span className="font-bold">React</span>, et là, j’ai su que
                  j’étais à ma place. Le développement web est devenu pour moi
                  un terrain d’expression à part entière, mêlant technique et
                  créativité.
                </p>
              </MotionReveal>
              <MotionReveal delay={0.6}>
                <Button
                  text="LinkedIn"
                  link="https://fr.linkedin.com/in/pierre-castanet-4b489493"
                />
              </MotionReveal>
            </div>
          </section>

          <section id="Outil" className="h-[100dvh] relative snap-start">
            <h1>Écran 3</h1>
          </section>
        </main>
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
}
