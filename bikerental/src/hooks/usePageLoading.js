"use client";

import { useState, useEffect } from "react";

const usePageLoading = (initialState = true, minLoadTime = 800) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const startLoading = () => setIsLoading(true);

  const stopLoading = (loadedData = null, error = null) => {
    // Ensure the loading indicator shows for at least minLoadTime
    const loadStartTime = Date.now();
    const timeElapsed = Date.now() - loadStartTime;
    const remainingTime = Math.max(0, minLoadTime - timeElapsed);

    setTimeout(() => {
      if (error) {
        setError(error);
      } else if (loadedData) {
        setData(loadedData);
      }
      setIsLoading(false);
    }, remainingTime);
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      setIsLoading(false);
      setData(null);
      setError(null);
    };
  }, []);

  return {
    isLoading,
    data,
    error,
    startLoading,
    stopLoading,
    setData,
  };
};

export default usePageLoading;
