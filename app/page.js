"use client";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import CubeBgHome from "../components/CubeBgHome";
import CubeBgEnd from "../components/CubeBgEnd";
import CubeBgMid from "../components/CubeBgMid";
import MotionReveal from "../components/motionReveal";
import ProjectGallery from "../components/ProjectGallery";
import MotionButton from "../components/MotionButton";
import { IconsRender } from "../components/IconsRender";

export default function Home() {
  const sections = ["Home", "Projet", "A propos"];
  const [activeSection, setActiveSection] = useState("Home");

  const yScroll = useRef(0);
  const yScale = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      yScroll.current = window.scrollY;
      yScale.current = window.innerHeight;
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

  const techStack = [
    "TypeScript",
    "React",
    "React Native",
    "Next.js",
    "Three.js",
    "Framer Motion",
    "TailwindCSS",
    "Expo",
    "Redux",
    "Express.js",
    "Node.js",
    "MongoDB",
    "Vercel",
  ];

  const designStack = [
    "After Effect",
    "Photoshop",
    "Illustrator",
    "Premiere Pro",
    "Cinema 4D",
    "Figma",
  ];

  const styles = {
    section:
      "h-screen w-screen flex flex-col items-center justify-center p-17 sm:p-25 md:p-33 lg:p-40 xl:p-45 2xl:p-70",
    sectionContent: "relative z-10 h-full w-full flex flex-col items-center justify-center",
    title:
      "text-2xl sm:text-3xl md:text-4xl lg:5xl xl:text-6xl 2xl:text-7xl break-all sm:break-normal  font-bold text-primary dark:text-primary-dark ",
  };

  const widthDivier = 120;
  const heightDivider = 150;

  return (
    <div>
      <Header sections={sections} activeSection={activeSection} />
      <main className="relative">
        <div className="absolute inset-0 z-0 h-screen w-screen">
          <div className="relative h-screen w-screen">
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
              <CubeBgHome
                yScroll={yScroll}
                widthDivier={widthDivier}
                heightDivider={heightDivider}
              />
            </Canvas>
          </div>
          <div className="relative h-screen w-screen">
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
              {/* <CubeBgMid
                yScroll={yScroll}
                widthDivier={widthDivier}
                heightDivider={heightDivider}
              /> */}
            </Canvas>
          </div>
          <div className="relative h-screen w-screen">
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
              <CubeBgEnd
                yScroll={yScroll}
                widthDivier={widthDivier}
                heightDivider={heightDivider}
              />
            </Canvas>
          </div>
        </div>
        {/* home */}
        <section id="Home" className={styles.section} style={{ pointerEvents: "none" }}>
          <div className="relative z-10 flex h-full w-full flex-col items-start justify-center">
            <MotionReveal delay={0.2}>
              <h1 className={styles.title}>Pierre Castanet</h1>
            </MotionReveal>
            <MotionReveal delay={0.4}>
              <h1 className=" font-bold break-all sm:break-normal text-xl sm:text-2xl   md:text-4xl xl:text-5xl 2xl:text-6xl">
                <span className="text-secondary dark:text-secondary-dark">
                  de motion designer à
                </span>{" "}
                développeur full stack
              </h1>
            </MotionReveal>
          </div>
        </section>
        {/* projets */}
        <section id="Projet" className={styles.section}>
          <div className="relative z-10 flex h-9/10 w-full flex-col items-center justify-between">
            <MotionReveal delay={0.1}>
              <div className="mb-5 text-center">
                <h2 className={styles.title}>Mes projets</h2>
              </div>
            </MotionReveal>
            <MotionReveal>
              <ProjectGallery />
            </MotionReveal>
            <div className="mt-5 flex flex-row">
              <MotionReveal delay={0.4}>
                <MotionButton
                  text="Github"
                  link={"https://github.com/PierreCGdev?tab=repositories"}
                />
              </MotionReveal>
            </div>
          </div>
        </section>
        <section id="A propos" className={styles.section}>
          <div className="relative flex h-2/3 w-full flex-col items-end justify-between md:h-5/6">
            <div className="flex flex-row text-right">
              <div className="mb-3">
                <MotionReveal delay={0.15}>
                  <h2 className={styles.title}>à propos</h2>
                </MotionReveal>
                <MotionReveal delay={0.3}>
                  <div>
                    <h3 className="mt-3 text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl">
                      <span className="text-secondary dark:text-secondary-dark">
                        de motion designer à{" "}
                      </span>
                      développeur
                    </h3>
                  </div>
                </MotionReveal>
              </div>
            </div>
            <MotionReveal delay={0.45}>
              <p className="text-justify sm:text-md md:text-right text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
                Issu du monde du <span className="font-bold">motion design</span>, j’ai découvert{" "}
                <span className="font-bold">JavaScript</span> en créant des scripts pour automatiser
                des animations sur After Effects. Cette première immersion dans le code a été un
                vrai déclic : j’y ai retrouvé le même plaisir créatif qu’en animation, mais avec une
                <span className="font-bold"> logique</span> et une
                <span className="font-bold"> rigueur</span> qui m’ont tout de suite captivé. J’ai
                ensuite approfondi mes compétences avec <span className="font-bold">React</span>, et
                là, j’ai su que j’étais à ma place. Le développement web est devenu pour moi un
                terrain d’expression à part entière, mêlant technique et créativité.
              </p>
            </MotionReveal>
            <div className="flex flex-col items-end my-5">
              <MotionReveal className="flex flex-row">
                <IconsRender iconsName={techStack} delay={0.4} />
              </MotionReveal>
              <div className="mt-5">
                <MotionReveal>
                  <IconsRender iconsName={designStack} delay={0.7} />
                </MotionReveal>
              </div>
            </div>

            <MotionReveal delay={1}>
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
  );
}
