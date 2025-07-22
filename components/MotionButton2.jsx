import React from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

const Button = ({ text, link }) => {
  const { resolvedTheme } = useTheme();
  const color = resolvedTheme === "dark" ? "var(--color-primary-dark)" : "var(--color-primary)";
  return (
    <div style={{ perspective: "800px" }}>
      <motion.button
        initial={{
          boxShadow: "0px 0px 0px rgba(0,0,0,0)",
          borderColor: "var(--button-border)",
          color: "var(--button-border)",
        }}
        whileHover={{
          rotateX: -15,
          rotateY: -7,
          z: 50,
          backgroundColor: "var(--button-bg)",
          borderColor: "var(--button-border)",
          color: "white",
          boxShadow: "0px 5px 40px rgba(0,0,0,0.3)",
          transition: { duration: 0.3 },
        }}
        onClick={() => window.open(link, "_blank")}
        className="sm:text-md flex cursor-pointer items-center justify-center rounded-full border-2 px-10 py-5 text-sm font-bold md:text-lg xl:text-xl"
      >
        {text}
      </motion.button>
    </div>
  );
};

export default Button;
