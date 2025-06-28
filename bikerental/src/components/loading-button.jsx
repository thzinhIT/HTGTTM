"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ButtonLoader } from "./skeleton-loader";

const LoadingButton = ({
  isLoading,
  onClick,
  children,
  disabled = false,
  className = "",
  loadingText = "Đang xử lý...",
  variant = "default",
  size = "default",
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`relative ${className}`}
      variant={variant}
      size={size}
      {...props}
    >
      {isLoading ? (
        <ButtonLoader text={loadingText} />
      ) : (
        <motion.div
          whileHover={{ x: 2 }}
          className="flex items-center space-x-2"
        >
          {children}
        </motion.div>
      )}
    </Button>
  );
};

export default LoadingButton;
