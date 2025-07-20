import { motion } from "motion/react";

export default function MotionReveal({ children, delay = 0.25 }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: {
          opacity: 1,
          y: 0,

          transition: {
            duration: 0.4,
            delay: delay + 0.1,
            ease: "easeInOut",
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 1, once: true }}
    >
      {children}
    </motion.div>
  );
}
