import { motion } from "motion/react";
import MotionReveal from "../components/motionReveal";
import { TbBrandFramerMotion, TbBrandReactNative } from "react-icons/tb";
import MotionButton from "../components/MotionButton";
import {
  SiExpress,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiRedux,
  SiThreedotjs,
  SiMongodb,
  SiTailwindcss,
  SiJsonwebtokens,
  SiNodedotjs,
  SiExpo,
  SiVercel,
  SiGithub,
  SiAdobeaftereffects,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobepremierepro,
  SiCinema4D,
  SiFigma,
} from "react-icons/si";

export function IconsRender({ iconsName, delay }) {
  const techIcons = {
    "Next.js": SiNextdotjs,
    TailwindCSS: SiTailwindcss,
    "Framer Motion": TbBrandFramerMotion,
    "Three.js": SiThreedotjs,
    "Express.js": SiExpress,
    React: SiReact,
    "React Native": TbBrandReactNative,
    TypeScript: SiTypescript,
    Redux: SiRedux,
    MongoDB: SiMongodb,
    JWT: SiJsonwebtokens,
    "Node.js": SiNodedotjs,
    Expo: SiExpo,
    Vercel: SiVercel,
    "After Effect": SiAdobeaftereffects,
    Photoshop: SiAdobephotoshop,
    Illustrator: SiAdobeillustrator,
    "Premiere Pro": SiAdobepremierepro,
    "Cinema 4D": SiCinema4D,
    Figma: SiFigma,
  };

  const designIcons = {};
  const iconsList = (iconsArray) => {
    return iconsArray.map((icon, i) => {
      const Icon = techIcons[icon];
      return (
        Icon && (
          <div key={icon} title={icon}>
            <MotionReveal delay={delay + i * 0.1} rotation={120}>
              <Icon
                className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9"
                aria-hidden="true"
                alt={icon}
              />
            </MotionReveal>
          </div>
        )
      );
    });
  };

  return (
    <div className="hidden md:flex flex-wrap w-full gap-2 md:gap-5">
      {iconsList(iconsName)}
    </div>
  );
}
