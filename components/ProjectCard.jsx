import { motion } from "motion/react";

export function ProjectCard({ id, title, img, onClick }) {
  return (
    <li
      className="cursor-pointer w-50 h-50 md:w-60 md:h-60 lg:w-80 lg:h-80 xl:w-100 xl:h-100 perspective-800"
      onClick={onClick}
    >
      <motion.div
        layoutId={`card-container-${id}`}
        className="relative rounded-xl overflow-hidden bg-gray-800 w-full h-full flex items-end justify-start"
        whileHover={{ scale: 1.05 }}
      >
        {/* Image en fond */}
        <motion.img
          layoutId={`card-image-${id}`}
          src={img}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay sombre (optionnel) */}
        <div className="absolute inset-0 bg-neutral-50/50 dark:bg-neutral-800/50 " />

        {/* Titre au-dessus */}
        <motion.h3
          layoutId={`card-title-${id}`}
          className="relative z-10 p-4 text-2xl sm:text-3xl md:text-5xl xl:text-6xl font-bold   "
        >
          {title}
        </motion.h3>
      </motion.div>
    </li>
  );
}
