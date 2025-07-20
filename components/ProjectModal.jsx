import { motion } from "motion/react";
import MotionReveal from "../components/motionReveal";
import { TbBrandFramerMotion } from "react-icons/tb";
import MotionButton from "../components/MotionButton";
import {
  SiExpress,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiRedux,
  SiThreedotjs,
  SiMongodb,
  SiTailwindcss,
  SiJsonwebtokens,
  SiNodedotjs,
  SiExpo,
  SiVercel,
  SiGithub,
} from "react-icons/si";

export function ProjectModal({ project, onClose }) {
  const techIcons = {
    "Next.js": SiNextdotjs,
    TailwindCSS: SiTailwindcss,
    "Framer Motion": TbBrandFramerMotion,
    "Three.js": SiThreedotjs,
    "Express.js": SiExpress,
    React: SiReact,
    "React Native": SiReact,
    TypeScript: SiTypescript,
    Redux: SiRedux,
    MongoDB: SiMongodb,
    JWT: SiJsonwebtokens,
    "Node.js": SiNodedotjs,
    Expo: SiExpo,
    Vercel: SiVercel,
  };

  const iconsList = (techArray) => {
    return techArray.map((tech) => {
      const Icon = techIcons[tech];
      return (
        Icon && (
          <div key={tech} title={tech}>
            <Icon
              className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10"
              aria-hidden="true"
            />
          </div>
        )
      );
    });
  };

  return (
    <div onClick={onClose}>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-neutral-50/60 dark:bg-neutral-800/60 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modale */}
      <div className="fixed inset-0 flex justify-center items-center z-50 ">
        <motion.div
          layoutId={`card-container-${project.id}`}
          className="w-3/5 h-3/5 bg-neutral-100 dark:bg-neutral-700 rounded-4xl overflow-hidden shadow-2xl/25 dark:shadow-2xl/75"
          onClick={(e) => e.stopPropagation()} // Stop propagation pour ne pas fermer en cliquant dedans
        >
          <motion.div className="flex justify-center items-center w-full h-1/4 sm:h-1/3 overflow-hidden">
            <motion.img
              className="w-full"
              layoutId={`card-image-${project.id}`}
              src={project.img}
              alt={project.title}
            />
          </motion.div>
          <motion.div className="p-5 sm:p-10 flex flex-col justify-between h-3/4 sm:h-2/3">
            <motion.div>
              <motion.h3
                layoutId={`card-title-${project.id}`}
                layout="position"
                className=" text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-bold text-primary dark:text-primary-dark "
              >
                {project.title}
              </motion.h3>
              <MotionReveal>
                <p className="text-sm  sm:text-md xl:text-xl 2xl:text-2xl mt-5">
                  {project.description}
                </p>
              </MotionReveal>
              <MotionReveal delay={0.4}>
                <div className="hidden md:flex flex-wrap w-full gap-2 md:gap-5  mt-15">
                  {iconsList(project.technologies)}
                </div>
              </MotionReveal>
            </motion.div>

            <motion.div className="flex  justify-center lg:justify-end w-full gap-2 md:gap-5  ">
              <MotionButton text="visiter le site" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
