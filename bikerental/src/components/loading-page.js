"use client";

import { HashLoader } from "react-spinners";

export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-black bg-white">
      <HashLoader color="#080cff" size={60} speedMultiplier={1} />
    </div>
  );
}
