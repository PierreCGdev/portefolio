"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

const Button = ({ text, link }) => {
  const { resolvedTheme: theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme) return null;

  const circleVariants = {
    initial: { scale: 0 },
    hover: {
      scale: 1.5,
      transition: { duration: 0.4 },
    },
  };
  const textVairants = {
    initial: {},
    hover: { color: "#fff" },
  };
  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      onClick={() => window.open(link, "_blank")}
      className="text-primary dark:text-primary-dark sm:text-md relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 px-4 py-3 text-sm font-bold md:px-6 md:py-3 lg:px-7 lg:py-4 md:text-lg xl:px-10 xl:py-5 xl:text-xl"
    >
      <motion.div
        variants={textVairants}
        className={`z-10 ${
          theme === "dark" ? "text-[var(--color-primary-dark)]" : "text-[var(--color-primary)]"
        } text-sm sm:text-sm md:text-md xl:text-lg 2xl:text-xl`}
      >
        {text}
      </motion.div>

      <motion.div
        className="bg-primary dark:bg-primary-dark absolute top-1/2 -left-5 z-0 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        variants={circleVariants}
      ></motion.div>
    </motion.button>
  );
};

export default Button;
