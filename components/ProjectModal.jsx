import { motion } from "motion/react";
import MotionReveal from "../components/motionReveal";

export function ProjectModal({ project, onClose }) {
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
          className="w-full max-w-3/5 h-full max-h-3/5 bg-neutral-100 dark:bg-neutral-700 rounded-xl overflow-hidden shadow-2xl/25 dark:shadow-2xl/75"
          onClick={(e) => e.stopPropagation()} // Stop propagation pour ne pas fermer en cliquant dedans
        >
          <motion.div className="flex justify-center items-center w-full h-80 overflow-hidden">
            <motion.img
              className="w-full"
              layoutId={`card-image-${project.id}`}
              src={project.img}
              alt={project.title}
            />
          </motion.div>
          <motion.h3
            layoutId={`card-title-${project.id}`}
            className="p-4 text-3xl sm:text-5xl md:text-7xl xl:text-8xl font-bold text-primary "
          >
            {project.title}
          </motion.h3>
          <MotionReveal>
            <p className="px-4 pb-6 text-xl">{project.description}</p>
          </MotionReveal>
        </motion.div>
      </div>
    </div>
  );
}
