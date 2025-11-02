"uce client"
import { useState, useEffect } from "react";

const TypewriterHeadlines = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  
  
  
  useEffect(() => {
    const lines = ['Powering Businesses', 'Empowering Sales'];
    if (currentLine < lines.length) {
      if (currentIndex < lines[currentLine].length) {
        const timeout = setTimeout(() => {
          setCurrentText(prevText => prevText + lines[currentLine][currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, 100);
        
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentText('');
          setCurrentIndex(0);
          setCurrentLine(prevLine => (prevLine + 1) % lines.length);
        }, 2000);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, currentLine]);

  return (
    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white min-h-[80px] flex items-center justify-center">
      <span>
        {currentText}
      </span>
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default TypewriterHeadlines;