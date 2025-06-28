// app/loading-provider.jsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalLoader from "@/components/loading-page";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingProvider({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set loading state to true when navigation starts
    setIsLoading(true);

    // Set a minimum but shorter loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Reduced to 300ms for faster page transitions while still providing feedback

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GlobalLoader />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: isLoading ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: isLoading ? 0.2 : 0 }}
      >
        {children}
      </motion.div>
    </>
  );
}
