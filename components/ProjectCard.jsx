import { motion } from "motion/react";

export function ProjectCard({ id, title, img, onClick }) {
  return (
    <div
      className="cursor-pointer w-50 h-50 md:w-60 md:h-60 lg:w-80 lg:h-80 xl:w-100 xl:h-100 hover:text-primary dark:hover:text-primary-dark  "
      onClick={onClick}
    >
      <motion.div
        layoutId={`card-container-${id}`}
        className="relative rounded-4xl overflow-hidden  bg-stone-200 dark:bg-neutral-700 w-full h-full flex items-end justify-start"
        whileHover={{ scale: 1.05 }}
      >
        {/* Image en fond */}
        <motion.img
          layoutId={`card-image-${id}`}
          src={img}
          alt={title}
          className="absolute inset-0 w-full h-2/3 object-cover "
        />

        {/* Overlay sombre (optionnel) */}
        <div className="absolute inset-0 h-2/3 bg-neutral-50/50 dark:bg-neutral-800/50" />

        {/* Titre au-dessus */}
        <motion.h3
          layoutId={`card-title-${id}`}
          layout="position"
          className="relative z-10 p-4 text-2xl sm:text-3xl md:text-5xl xl:text-6xl font-bold w-full h-1/3"
        >
          {title}
        </motion.h3>
      </motion.div>
    </div>
  );
}
