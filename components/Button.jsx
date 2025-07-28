import React from "react";

const Button = ({ text, className = "", link }) => {
  return (
    <div>
      <div className="flex justify-center items-center dark:bg-blackmin-w-full min-h-full mt-5">
        <div className="group p-5">
          <button
            onClick={() => window.open(link, "_blank")}
            className="border-2 px-10 py-5 text-blue-400  dark:bg-black  dark:font-bold  dark:shadow-gray-500 text-sm sm:text-md md:text-lg xl:text-xl font-bold 
  rounded-full group-hover:bg-pink-400  group-hover:text-white group-hover:border-none group-hover:shadow-2xl 
  group-hover:shadow-bg-pink-600 group-hover:font-bold group-hover:translate-y-2 duration-500 group-hover:skew-x-3 group-hover:skew-y-1 ease-in-out"
          >
            {text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button;
