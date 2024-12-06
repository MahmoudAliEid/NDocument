import React from "react";
import { motion } from "framer-motion";
import { stringToColor } from "@/lib/stringToColor";

const FollowPointer = ({
  x,
  y,
  info: { name, email },
}: {
  x: number;
  y: number;
  info: {
    name: string;
    email: string;
    avatar: string;
  };
}) => {
  const color = stringToColor(email || "1");

  return (
    <motion.div
      style={{
        left: x,
        top: y,
        backgroundColor: "transparent",
      }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="w-4 h-4 absolute z-50 "
    >
      {/* <svg
        fill={color}
        stroke={color}
        strokeWidth="1"
        height="1rem"
        width="1rem"
        viewBox="0 0 16 16"
        className={`h-6 w-6 text-[${color}] transform -rotate-[70deg] -translate-x-[12px] -translate-y-[8px] stroke-[${color}]`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 1 1 .103.557L8.528 15.467a.5.5 0 1 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.086-.916l12.728-5.657a.5.5 0 1 1 .637.103z" />
      </svg> */}
      <svg
        fill={color}
        stroke={color}
        height="1.5rem"
        width="1.5rem"
        viewBox="-2.4 -2.4 28.80 28.80"
        className={`h-6 w-6 text-[${color}] transform -rotate-[70deg] -translate-x-[12px] -translate-y-[1px] stroke-[${color}]`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke="#CCCCCC"
          stroke-width="2.64"
        >
          <path d="M3,10.714,21,3,13.286,21,12,12Z"></path>
        </g>
        <g id="SVGRepo_iconCarrier">
          <path d="M3,10.714,21,3,13.286,21,12,12Z"></path>
        </g>
      </svg>

      <motion.div
        className=" bg-neutral-200 px-2 py-2 rounded-full  !text-white font-bold whitespace-nowrap min-w-max text-xs "
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.5,
        }}
        style={{ backgroundColor: color }}
      >
        {name || email}
      </motion.div>
    </motion.div>
  );
};

export default FollowPointer;