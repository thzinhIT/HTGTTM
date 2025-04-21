"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // nếu bạn có file utils, hoặc bỏ qua

const themes = [
  { label: "Hệ thống", value: "system" },
  { label: "Sáng", value: "light" },
  { label: "Tối", value: "dark" },
];

export default function ThemeSwitch() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div>
      <p className="mb-2 font-medium">Giao diện</p>
      <div className="flex gap-4">
        {themes.map((t) => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={cn(
              "rounded-lg border p-2 w-28 text-sm transition-all",
              (theme === t.value || resolvedTheme === t.value) &&
                "border-blue-500 ring-2 ring-blue-400"
            )}
          >
            <div className="aspect-video w-full bg-gray-100 dark:bg-gray-900 rounded mb-1"></div>
            <p className="text-center">{t.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
