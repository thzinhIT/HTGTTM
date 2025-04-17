// app/loading-provider.jsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalLoader from "@/components/loading-page";

export default function LoadingProvider({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // ít nhất 1.5s như bạn muốn

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {isLoading && <GlobalLoader />}
      {children}
    </>
  );
}
