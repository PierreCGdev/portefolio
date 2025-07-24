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
          className="h-4/6 w-4/5  md:w-3/5  lg:h-3/5 lg:w-3/5 overflow-hidden rounded-4xl bg-neutral-100 shadow-2xl/25 dark:bg-neutral-700 dark:shadow-2xl/75"
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
            {project.video && (
              <div className="hidden xl:flex justify-center items-start ml-10 mt-10">
                <div className="w-40 xl:w-50  2xl:w-55 aspect-[9/16] relative">
                  <iframe
                    src={`${project.video}?autoplay=1&autopause=0&background=0&playsinline=1`}
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    allow="autoplay; fullscreen; picture-in-picture"
                    title={project.title}
                  />
                </div>
              </div>
            )}

            <motion.div className="flex flex-col justify-between p-5 sm:p-10">
              <motion.div>
                <motion.h3
                  layoutId={`card-title-${project.id}`}
                  layout="position"
                  className=" text-primary dark:text-primary-dark  font-bold break-all text-xl sm:text-2xl md:text-3xl xl:text-5xl 2xl:text-7xl sm:break-normal "
                >
                  {project.title}
                </motion.h3>
                <MotionReveal>
                  <p className=" text-sm   xl:text-md 2xl:text-xl mt-5 ">{project.description}</p>
                </MotionReveal>

                <div className="mt-7">
                  <IconsRender iconsName={project.technologies} delay={0.4} />
                </div>
              </motion.div>
              <motion.div className="md:mt-3 flex w-full justify-center lg:justify-end">
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
