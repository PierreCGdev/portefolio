import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import ThemeToggle from "./ThemeToggle";
import AnimatedSideMenu from "./AnimatedSideMenu";
import { motion } from "motion/react";

export default function Header({ activeSection, sections }) {
  const [isOpen, setIsOpen] = useState(false);

  // Convertir les sections en format pour le drawer
  const menuData = sections.map((section) => ({
    name: section,
    url: `#${section}`,
  }));
  const sectionList = sections.map((section) => {
    return (
      <a
        key={section}
        href={`#${section}`}
        className={`hover:text-menu-secondary hover:dark:text-menu-secondary-dark  ${
          activeSection === section ? "text-menu-primary dark:text-menu-primary-dark" : ""
        }`}
      >
        {section}
      </a>
    );
  });

  const sectionListMobile = sections.map((section) => {
    return (
      <a key={section} href={`#${section}`}>
        {section}
      </a>
    );
  });
  const menuVariants = {
    visible: {
      x: 0,
      opacity: 1,
    },
    hidden: {
      x: 60,
      opacity: 0,
    },
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header className="w-full flex items-center justify-between px-15 py-10  fixed top-0 z-50 bg-gradient-to-b from-neutral-50/100 dark:from-neutral-800/100 to-transparent">
        <div className="text-xl font-bold">Portfolio</div>
        <div className="flex items-center gap-10 lg:gap-14">
          <ThemeToggle />
          {/* Desktop menu */}
          <nav className="hidden md:flex gap-20 md:lg lg:text-xl xl:text-2xl items-center">
            {sectionList}
          </nav>
          {/* Mobile burger */}
          <motion.button
            className="md:hidden"
            onClick={toggleMenu}
            variants={menuVariants}
            animate={isOpen ? "hidden" : "visible"}
            transition={{ type: "spring", damping: 60, stiffness: 180 }}
          >
            <LuMenu size={24} />
          </motion.button>
        </div>
      </header>
      {/* burger mobile et Drawer animé pour mobile */}
      <motion.div className="md:hidden ">
        <AnimatedSideMenu
          data={menuData}
          width={280}
          activeSection={activeSection}
          toggleMenu={toggleMenu}
          isOpen={isOpen}
        />
      </motion.div>
    </>
  );
}
