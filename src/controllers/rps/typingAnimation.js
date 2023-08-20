import React, { useState, useEffect } from 'react';
import '../../assets/typingAnimation.css';

const TypingAnimation = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const typingSpeed = 30;

  useEffect(() => {
    let currentIndex = 0;
    const textLength = text.length;

    const typingInterval = setInterval(() => {
      setDisplayText(text.substring(0, currentIndex));
      currentIndex++;

      if (currentIndex > textLength) {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text]);

  return (
    <span className="typing-animation">{displayText}</span>
  );
};

export default TypingAnimation;