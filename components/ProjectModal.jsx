import { motion } from "motion/react";
import MotionReveal from "../components/motionReveal";
import MotionButton from "../components/MotionButton";
import { IconsRender } from "../components/IconsRender";

export function ProjectModal({ project, onClose }) {
  return (
    <div onClick={onClose}>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 z-40 bg-neutral-50/60 dark:bg-neutral-800/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modale */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          layoutId={`card-container-${project.id}`}
          className="h-3/5 w-3/5 overflow-hidden rounded-4xl bg-neutral-100 shadow-2xl/25 dark:bg-neutral-700 dark:shadow-2xl/75"
          onClick={(e) => e.stopPropagation()} // Stop propagation pour ne pas fermer en cliquant dedans
        >
          <motion.div className="flex h-1/5 w-full items-center justify-center overflow-hidden sm:h-1/4">
            <motion.img
              className="w-full"
              layoutId={`card-image-${project.id}`}
              src={`/images/${project.img}`}
              alt={project.title}
            />
          </motion.div>
          <div className="flex h-4/5 flex-row sm:h-3/4">
            <div className="flex w-1/5">
              {project.video && (
                <div className="w-72 hidden xl:flex justify-center items-start ml-10 mt-10">
                  <iframe
                    src={`${project.video}?autoplay=1&autopause=0&background=0&playsinline=1`}
                    className="rounded-xl aspect-9/16 "
                    allow="autoplay; fullscreen; picture-in-picture"
                    title={project.title}
                  />
                </div>
              )}
            </div>
            <motion.div className="flex flex-col justify-between p-5 sm:p-10">
              <motion.div>
                <motion.h3
                  layoutId={`card-title-${project.id}`}
                  layout="position"
                  className="lg:5xl text-primary dark:text-primary-dark text-2xl font-bold break-all sm:text-3xl sm:break-normal md:text-4xl xl:text-6xl 2xl:text-7xl"
                >
                  {project.title}
                </motion.h3>
                <MotionReveal>
                  <p className="sm:text-md md:text-md mt-5 text-sm xl:text-lg 2xl:text-xl">
                    {project.description}
                  </p>
                </MotionReveal>

                <div className="mt-7">
                  <IconsRender iconsName={project.technologies} delay={0.4} />
                </div>
              </motion.div>
              <motion.div className="mt-3 flex w-full justify-center lg:justify-end">
                {project.link && (
                  <MotionButton
                    text={project.video ? "lien Expo" : "visiter le site"}
                    link={project.link}
                  />
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
