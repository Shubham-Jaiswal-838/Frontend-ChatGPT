import React, { useState, useEffect, memo } from "react";

const AnimatedTyping = ({ text }) => {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setCurrentText((prevText) => {
        if (currentIndex >= text.length) {
          clearInterval(intervalId);
          return prevText;
        } else {
          currentIndex++;
          return text.substring(0, currentIndex);
        }
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, [text]);

  return <div className="typewriter chatgpt">{currentText}</div>;
};

export default memo(AnimatedTyping);
