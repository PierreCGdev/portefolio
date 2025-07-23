"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "motion/react";
import { LuMenu, LuX } from "react-icons/lu";

const SideBarList = ({ data, onItemClick, activeSection }) => {
  return (
    <div className="flex flex-col gap-4 mt-16">
      {data.map((item, i) => (
        <motion.a
          key={i}
          href={item.url}
          onClick={onItemClick}
          className={`text-lg block py-2 cursor-pointer transition-colors duration-200
              ${activeSection === item.name ? "text-menu-primary dark:text-menu-primary-dark" : "hover:text-secondary"}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          {item.name}
        </motion.a>
      ))}
    </div>
  );
};

export const AnimatedSideMenu = ({ width = 300, data, activeSection, toggleMenu, isOpen }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(isOpen ? "visible" : "hidden");
  }, [isOpen, controls]);

  const drawerVariants = {
    visible: {
      x: 0,
    },
    hidden: {
      x: width,
    },
  };

  const overlayVariants = {
    visible: {
      opacity: 1,
      pointerEvents: "all",
    },
    hidden: {
      opacity: 0,
      pointerEvents: "none",
    },
  };

  const menuVariants = {
    visible: {
      x: 0,
      color: "#43e5a2",
    },
    hidden: {
      x: -60,
      color: "#fff",
    },
  };

  return (
    <div
      className="fixed w-full h-full top-0 left-0  z-50"
      style={{
        pointerEvents: isOpen ? "all" : "none",
      }}
    >
      {/* Overlay */}
      <motion.div
        className="absolute w-full h-full top-0 left-0 z-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        animate={controls}
        variants={overlayVariants}
        transition={{ duration: 0.3 }}
        onClick={toggleMenu}
      />

      {/* drawer */}
      <motion.div
        className="relative z-10 pointer-events-all bg-white dark:bg-neutral-900 h-full box-border"
        style={{
          padding: "40px 30px 30px 60px",
          width: `${width}px`,
          position: "absolute",
          right: 0,
        }}
        animate={controls}
        variants={drawerVariants}
        transition={{ type: "spring", damping: 60, stiffness: 180 }}
      >
        {/* bouton du menu */}
        <motion.button
          className="border-none bg-transparent rounded-none absolute top-4 outline-none mr-10 mt-8"
          onClick={toggleMenu}
          variants={menuVariants}
          transition={{ type: "spring", damping: 60, stiffness: 180 }}
        >
          <LuX size={24} />
        </motion.button>

        {/* contenu du menu */}
        <SideBarList data={data} onItemClick={toggleMenu} activeSection={activeSection} />
      </motion.div>
    </div>
  );
};

export default AnimatedSideMenu;
