"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header({activeSection, sections}) {
  const [open, setOpen] = useState(false);
  const sectionList = sections.map((section) => {
    return (
      <a
      key={section}
      href={`#${section}`}
      className={`hover:text-amber-200 ${
        activeSection === section ? "text-orange-300" : ""
      }`}
    >
        {section}
      </a>
    );
  });

  const sectionListMobile = sections.map((section) => {
    return (
      <a key={section} href={`#${section}`}>{section}</a>
    );
  });
  return (
    <header className="w-full flex items-center justify-between px-15 py-10 border-zinc-800 text-black dark:text-white fixed top-0 z-50">
      <div className="text-xl font-bold">PC</div>

      {/* Desktop menu */}
      <nav className="hidden md:flex gap-20 text-xl">
        <ThemeToggle />
        {sectionList}
      </nav>

      {/* Mobile burger */}
      <button onClick={() => setOpen(!open)} className="md:hidden">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Drawer mobile */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-black flex flex-col items-center gap-4 py-4 md:hidden border-t border-zinc-700">
          {sectionListMobile}
        </div>
      )}
    </header>
  );
}