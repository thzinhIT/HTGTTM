"use client";

import { motion } from "framer-motion";

export default function GlobalLoader() {
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
}
