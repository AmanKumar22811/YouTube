import React, { useEffect, useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";

const DarkMode = ({ onToggle }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
    onToggle(); // Call the onToggle function from props
  };

  return (
    <div className="relative w-16  bottom-6">
      {theme === "light" ? (
        <BsToggleOff
          onClick={handleToggle}
          className="w-16 size-[45px] cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-350 absolute right-0 z-10"
        />
      ) : (
        <BsToggleOn
          onClick={handleToggle}
          className="w-16 size-[45px] cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 absolute right-0 z-10"
        />
      )}
    </div>
  );
};

export default DarkMode;
