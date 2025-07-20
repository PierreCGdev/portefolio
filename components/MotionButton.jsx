import React from "react";
import { motion } from "motion/react";

const Button = ({ text, link }) => {
  const circleVariants = {
    initial: { scale: 0 },
    hover: {
      scale: 1.5,
      transition: { duration: 0.4 },
    },
  };
  const textVairants = {
    initial: { color: "var(--color-primary)" },
    hover: { color: "white" },
  };
  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      onClick={() => window.open(link, "_blank")}
      className=" relative flex overflow-hidden justify-center items-center cursor-pointer px-10 py-5 text-primary dark:text-primary-dark  text-sm sm:text-md md:text-lg xl:text-xl font-bold  border-2 rounded-full"
    >
      <motion.div variants={textVairants} className="z-10">
        {text}
      </motion.div>

      <motion.div
        className="absolute w-[200%] aspect-square  rounded-full bg-primary dark:bg-primary-dark z-0  top-1/2 -left-5 -translate-y-1/2 -translate-x-1/2"
        variants={circleVariants}
      ></motion.div>
    </motion.button>
  );
};

export default Button;
