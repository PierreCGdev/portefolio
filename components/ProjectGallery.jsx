"use client";
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
      <ul className="flex flex-wrap gap-8 justify-center">
        {data.map((project, i) => (
          <MotionReveal delay={(i + 1) * 0.25} key={project.id}>
            <ProjectCard
              {...project}
              onClick={() => setSelectedId(project.id)}
            />
          </MotionReveal>
        ))}
      </ul>

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
