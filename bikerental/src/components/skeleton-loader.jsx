"use client";

import React from "react";
import { motion } from "framer-motion";

const SkeletonCard = ({ className = "" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="shadow-[0px_5px_15px_0px_rgba(0,0,0,0.15)] dark:bg-gray-800 bg-white flex flex-col justify-between w-full min-h-[430px] rounded-lg overflow-hidden">
        <div className="px-3 py-3 flex flex-col">
          {/* Title skeleton */}
          <div className="mt-10 mb-2 mx-auto h-9 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>

          {/* Price skeleton */}
          <div className="my-10 text-center">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
          </div>

          {/* Details skeleton */}
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
            </div>
          </div>
        </div>

        {/* Button skeleton */}
        <div className="mb-3 w-full mt-3">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-2/3 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export const TableSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-between px-10 w-full gap-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="w-[30%] mb-5">
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
};

export const PageLoader = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: { y: -10, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90">
      <motion.div
        className="flex items-center justify-center mb-4"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.span
            key={index}
            className="w-4 h-4 mx-1 rounded-full bg-blue-600"
            variants={itemVariants}
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.1,
              delay: index * 0.1,
            }}
          />
        ))}
      </motion.div>
      <motion.p
        className="text-xl font-medium text-blue-700 dark:text-blue-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Đang tải...
      </motion.p>
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="mb-10">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto"></div>
      </div>

      {/* Profile info section */}
      <div className="flex items-start gap-10 pb-3 border-b">
        {/* Avatar skeleton */}
        <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>

        {/* Personal info skeletons */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>

          <div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>

          <div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      </div>

      {/* Card section */}
      <div className="mt-10">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-10"></div>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>

            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
          </div>

          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/6 mb-4"></div>

          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="col-span-2">
                <div className="border rounded-lg p-4 dark:bg-gray-800 bg-gray-100 shadow-sm">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ButtonLoader = ({ text = "Đang xử lý..." }) => {
  return (
    <div className="flex items-center space-x-2 justify-center">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      <span>{text}</span>
    </div>
  );
};

export default SkeletonCard;
