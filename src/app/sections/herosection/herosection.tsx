"use client";

import React from "react";
import { motion } from "framer-motion";

// interface Props {
//   imageUrl: string;
// }

function Herosection() {
  const variants = {
    hidden: {
      x: "100vw",
    },
    visible: {
      x: 0,
      // y:-10,
      transition: {
        duration: 1,
        stiffness: 80,
        damping: 10,
      },
    },
  };
  const variants1 = {
    hidden: {
      x: "-100vw",
    },
    visible: {
      x: 0,
      // y:-10,
      transition: {
        duration: 1,
        stiffness: 80,
        damping: 10,
      },
    },
  };
  return (
    <section className="mb-80">
      <div className="flex flex-col items-center h-auto ">
        {/* NAME AND PROMT */}
        <div className="flex flex-col mt-8 items-center">
          <div className="font-pops text-h1 laptop:text-[82px] font-bold text-primary ">
            {" "}
            Any. Food
          </div>
          <div className="text-primary font-pops text-[12px] font-light w-56 text-center">
            Don’t know what to eat then generate your <b>food</b> now
          </div>
        </div>
        {/* Hand */}

        {/* <button
          type="button"
          class="absolute top-[39%] z-50 h-20 w-20 rounded-full text-white font-pops bg-gradient-to-br bg-secondary border-4 border-pumpkin hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-blue-800 font-medium  text-sm px-5 py-5 text-center "
        >
          now
        </button> */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="z-20 laptop:z-30 absolute top-[25%] left-[45%] laptop:right-0 pr-0 "
        >
          <img
            src="https://i.imgur.com/CMG7LZp.png"
            alt="Moving Image"
            className="laptop:w-full animate-lightbounce object-contain"
          />
        </motion.div>

        {/* vendor woman  */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="z-30 absolute laptop:top-20 laptop:left-1/2 left-[35%] top-[55%] pr-0 "
        >
          <img
            src="https://i.imgur.com/qnHq8nm.png"
            alt="Moving Image"
            className="w-full animate-lightbounce object-contain"
          />
        </motion.div>
        <div className="top-[%]">
          {/* Yellow circle */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants1}
            className="absolute z-20 -left-[50px] top-[35%] pr-0 "
          >
            <svg
              className="w-2/5 z-0 "
              width="520"
              height="503"
              viewBox="0 0 520 503"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M520 251.5C520 390.4 403.594 503 260 503C116.406 503 0 390.4 0 251.5C0 112.6 116.406 0 260 0C403.594 0 520 112.6 520 251.5Z"
                fill="#FDCD00"
              />
            </svg>
          </motion.div>
          {/* Table */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants1}
            className="absolute z-20 top-[56%] -left-[50px] pr-0 "
          >
            <img
              src="https://i.imgur.com/uv8FvV6.png"
              alt="Moving Image"
              className="w-[45%] animate-lightbounce object-contain"
            />
          </motion.div>
          {/* Chair */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants1}
            className="absolute z-20 top-[63%] left-[1%] pr-0 "
          >
            <img
              src="https://i.imgur.com/7wEnrJF.png"
              alt="Moving Image"
              className="w-2/5 animate-lightbounce object-contain"
            />
          </motion.div>
          {/* Pho */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants1}
            className="z-20 absolute -left-[2%] top-[51%] "
          >
            <img
              src="https://i.imgur.com/Y3VUQBI.png"
              alt="Moving Image"
              className="w-2/5 animate-lightbounce object-contain"
            />
          </motion.div>
          {/* Banh Mi */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants1}
            className="z-20 absolute top-[56%] left-[3%]  pr-0 "
          >
            <img
              src="https://i.imgur.com/0fHvwX4.png"
              alt="Moving Image"
              className="w-2/5 animate-lightbounce object-contain"
            />
          </motion.div>
        </div>


        {/* yellow layer */}
        {/* <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="absolute  z-20  top-[35%] pr-0 "
        >
          <svg
            className="w-11/12"
            width="573"
            height="719"
            viewBox="0 0 573 719"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 312L325.5 1H588V718L1 312Z"
              fill="#FDCD00"
              stroke="#FDCD00"
            />
          </svg>
        </motion.div> */}
        {/* pathway  */}
        {/* <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="z-20 absolute laptop:right-0   pr-0 "
        >
          <img
            src="https://i.imgur.com/v4lNaXO.png"
            alt="Moving Image"
            className=" w-full laptop:w-1/2 animate-lightbounce object-contain"
          />
        </motion.div> */}

        {/* Search */}
        {/* <div className="w-[250px] laptop:w-auto mt-24 z-50 ml-5">
          <form class="flex items-center justify-center laptop:mt-36">
            <label for="simple-search" class="sr-only">
              Search
            </label>
            <div class="relative w-[300px]">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-white dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                class="bg-white/30 border text-white font-pops border-gray-300 rounded-full text-[10px] laptop:text-h7  text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search food, restaurants, reviews"
                required
              />
            </div>
            <button
              type="submit"
              class="p-2.5 ml-2 text-sm font-medium text-white bg-secondary rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span class="sr-only">Search food, restaurants</span>
            </button>
          </form>
        </div> */}

        {/* <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="z-20 absolute right-32 top-14 pr-0 "
      >
        <img
          src="https://i.imgur.com/v4lNaXO.png"
          alt="Moving Image"
          className="w-[90%] animate-lightbounce object-contain"
        />
      </motion.div> */}
      </div>
    </section>
  );
}

export default Herosection;
