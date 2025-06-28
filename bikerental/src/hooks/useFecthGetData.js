import { useState, useEffect, useCallback, useRef } from "react";

const useFetchGetData = (url, options = {}) => {
  const { cacheTime = 5 * 60 * 1000 } = options; // 5 minutes default cache time
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Cache mechanism
  const cache = useRef({});
  const cacheTimestamps = useRef({});

  // Abort controller to cancel requests when component unmounts
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async () => {
    // Check if we have a valid cached response
    const now = Date.now();
    if (cache.current[url] && now - cacheTimestamps.current[url] < cacheTime) {
      setData(cache.current[url]);
      setLoading(false);
      return;
    }

    // Cancel any in-flight requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new abort controller
    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);

      const response = await fetch(url, {
        signal: abortControllerRef.current.signal,
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) throw new Error("Lỗi khi fetch dữ liệu");

      const json = await response.json();

      // Cache the response
      cache.current[url] = json;
      cacheTimestamps.current[url] = Date.now();

      setData(json);
      setError(null);
    } catch (err) {
      // Don't set error for aborted requests
      if (err.name !== "AbortError") {
        setError(err.message);
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  }, [url, cacheTime]);

  useEffect(() => {
    fetchData();

    return () => {
      // Cancel request on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData, reloadTrigger]);

  const refetch = useCallback(() => {
    // Clear cache for this URL
    delete cache.current[url];
    delete cacheTimestamps.current[url];
    setReloadTrigger((prev) => prev + 1);
  }, [url]);

  return { data, loading, error, refetch };
};
export default useFetchGetData;
