"use client";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CubeBackground from "../components/CubeBackground";
import CubeBgHome from "../components/CubeBgHome";
import { useState, useEffect, useRef, Suspense } from "react";
import ThemeProvider from "../components/ThemeProvider";
import Button from "../components/Button";
import MotionReveal from "../components/motionReveal";
import CanvasReveal from "../components/CanvasReveal";
import { Canvas } from "@react-three/fiber";
import ProjectCard from "../components/ProjectCard";
import ProjectGallery from "../components/ProjectGallery";
import MotionButton from "../components/MotionButton";

export default function Home() {
  const sections = ["Home", "Projet", "A propos"];
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

  const styles = {
    section:
      "h-screen w-screen flex flex-col items-center justify-center p-13 sm:p-20 md:p-30 lg:p-45 xl:p-65 2xl:p-70",
    sectionContent:
      "relative z-10 h-full w-full flex flex-col items-center justify-center",
    title:
      "text-2xl sm:text-4xl md:text-6xl xl:text-8xl break-all sm:break-normal  font-bold text-primary dark:text-primary-dark ",
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div>
        <Header sections={sections} activeSection={activeSection} />
        <main className="relative">
          {/* home */}
          <section
            id="Home"
            className={styles.section}
            style={{ pointerEvents: "none" }}
          >
            <div className="relative z-10 h-full w-full  flex flex-col items-start justify-center">
              <MotionReveal delay={0.1}>
                <h1 className={styles.title}>Pierre Castanet</h1>
              </MotionReveal>
              <MotionReveal delay={0.25}>
                <h1 className="text-2xl sm:text-4xl md:text-6xl xl:text-8xl font-bold break-all sm:break-normal">
                  <span className="text-secondary">de motion designer à</span>{" "}
                  développeur full stack
                </h1>
              </MotionReveal>
            </div>
            <div className="absolute inset-0 h-screen w-screen z-0">
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
          <section id="Projet" className={styles.section}>
            <div className="relative z-10 h-2/3 w-full  flex flex-col items-center justify-between">
              <MotionReveal delay={0.1}>
                <div className="text-center">
                  <h2 className={styles.title}>Mes projets</h2>
                </div>
              </MotionReveal>
              <MotionReveal>
                <ProjectGallery />
              </MotionReveal>
              <div className="flex flex-row">
                <MotionReveal delay={0.5}>
                  <MotionButton
                    text="Mon Github"
                    link={"https://github.com/PierreCGdev?tab=repositories"}
                  />
                </MotionReveal>
              </div>
            </div>
          </section>
          <section id="A propos" className={styles.section}>
            <div className="relative h-1/2 w-full  flex flex-col items-end justify-between">
              <div className="flex flex-row text-right">
                <div>
                  <MotionReveal delay={0.15}>
                    <h2 className={styles.title}>mon parcours</h2>
                  </MotionReveal>
                  <MotionReveal delay={0.3}>
                    <div>
                      <h3 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mt-3">
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
                <p className="text-right text-md sm:text-xl md:text-2xl xl:text-3xl">
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
                <MotionButton
                  text="LinkedIn"
                  link={"https://fr.linkedin.com/in/pierre-castanet-4b489493"}
                />
              </MotionReveal>
            </div>
          </section>

          {/* <section
            id="Outil"
            className="h-screen w-screen flex items-center justify-center"
          >
            <h1>Écran 3</h1>
          </section> */}
        </main>
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
}
