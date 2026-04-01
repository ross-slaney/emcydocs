"use client";

import { useEffect, useState } from "react";

const themes = [
  { id: "purple", label: "Purple", hue: "270" },
  { id: "blue", label: "Blue", hue: "220" },
  { id: "teal", label: "Teal", hue: "175" },
  { id: "rose", label: "Rose", hue: "350" },
  { id: "orange", label: "Orange", hue: "25" },
  { id: "green", label: "Green", hue: "145" },
];

export default function ThemeSwitcher({ className }: { className?: string }) {
  const [activeTheme, setActiveTheme] = useState("purple");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("emcydocs-theme");
    if (saved) {
      setActiveTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const handleThemeChange = (themeId: string) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("emcydocs-theme", themeId);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white"
        aria-label="Change theme color"
      >
        <span
          className="h-3 w-3 rounded-full"
          style={{
            background: `hsl(${themes.find((t) => t.id === activeTheme)?.hue ?? 270} 80% 65%)`,
          }}
        />
        <span className="hidden sm:inline">Theme</span>
        <svg
          className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-white/10 bg-zinc-900/95 p-2 shadow-xl backdrop-blur-xl">
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Accent Color
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleThemeChange(theme.id)}
                  className={`flex flex-col items-center gap-1.5 rounded-lg p-2 transition-all ${
                    activeTheme === theme.id
                      ? "bg-white/10 ring-1 ring-white/20"
                      : "hover:bg-white/5"
                  }`}
                  aria-label={`Switch to ${theme.label} theme`}
                >
                  <span
                    className="h-5 w-5 rounded-full ring-2 ring-offset-1 ring-offset-zinc-900"
                    style={{
                      background: `hsl(${theme.hue} 80% 65%)`,
                      boxShadow:
                        activeTheme === theme.id
                          ? `0 0 0 2px hsl(${theme.hue} 80% 65%)`
                          : "0 0 0 2px transparent",
                    }}
                  />
                  <span className="text-[10px] font-medium text-zinc-400">
                    {theme.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
