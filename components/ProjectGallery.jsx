import { useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { data } from "../lib/projects";
import MotionReveal from "../components/motionReveal";

export default function ProjectGallery() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <LayoutGroup>
      <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-9 xl:gap-10 2xl:gap-10  justify-center">
        {data.map((project, i) => (
          <MotionReveal delay={(i + 1) * 0.15} key={project.id}>
            <ProjectCard {...project} onClick={() => setSelectedId(project.id)} />
          </MotionReveal>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <ProjectModal
            key="modal"
            project={data.find((p) => p.id === selectedId)}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
