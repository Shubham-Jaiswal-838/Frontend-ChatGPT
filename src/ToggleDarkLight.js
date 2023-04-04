import React, { useState } from "react";
import { BsSun } from "react-icons/bs";
// import "./App.css";
import {HiOutlineMoon} from "react-icons/hi"

const ToggleDarkLight = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    const body = document.querySelector("body");
    body.classList.toggle("dark-mode");
  };

  return (
    <div className={`features ${isDarkMode ? "dark" : "light"}`} >
      <div className="header">
        <button onClick={handleModeToggle}>
          {isDarkMode ? (
          <p className="inline-block"><HiOutlineMoon /> Dark mode</p> 
          ) : (
          <p className="inline-block"> <BsSun /> Light mode  </p>

          )}
        </button>
      </div>
    </div>
  );
};

export default ToggleDarkLight;
