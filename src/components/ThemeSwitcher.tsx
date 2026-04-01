"use client";

import { useEffect, useState } from "react";

const themes = [
  { id: "purple", hue: "270" },
  { id: "blue", hue: "220" },
  { id: "teal", hue: "175" },
  { id: "rose", hue: "350" },
  { id: "orange", hue: "25" },
  { id: "green", hue: "145" },
];

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState("purple");

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
  };

  return (
    <div className="emcydocs-theme-switcher">
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => handleThemeChange(theme.id)}
          className={`emcydocs-theme-dot ${activeTheme === theme.id ? "is-active" : ""}`}
          style={{
            ["--dot-color" as string]: `hsl(${theme.hue} 80% 65%)`,
          }}
          aria-label={`Switch to ${theme.id} theme`}
        />
      ))}
    </div>
  );
}
