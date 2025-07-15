"use client";
import Image from "next/image";

export default function ProjectCard() {
  return (
    <div className="w-100 h-100 border-2 border-lime-400 rounded-4xl  m-5 overflow-hidden">
      <div className="overflow-hidden w-full h-3/4 ">
        <Image
          src="/images/portrait.jpg"
          alt="Pierre Castanet"
          width={500}
          height={100}
        />
      </div>

      <h3> ça veille</h3>
    </div>
  );
}
