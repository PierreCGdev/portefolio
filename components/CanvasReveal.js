import { useInView } from "motion/react";
import { useRef } from "react";

export default function CanvasReveal({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <div className="absolute inset-0 h-full w-full z-0" ref={ref}>
      {isInView && children}
    </div>
  );
}
