import React, { useState, useEffect } from "react";

function RandomQuotes() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = [
    `“All our dreams can come true; if we have the courage to pursue them.” – Walt Disney`,
    `“Do what you can, with what you’ve got, where you are.” – Teddy Roosevelt`,
    `“People begin to become successful the minute they decide to be.” – Harvey MacKay`,
    `“It always seems impossible until it’s done.” – Nelson Mandela`,
    `“Nothing is impossible, the word itself says ‘I’m possible’!” – Audrey Hepburn`,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Check if we've reached the end of the array
      if (currentIndex < data.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // restart interval when all elements are rendered
        setCurrentIndex(0);
      }
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => {
      // Cleanup: Clear the interval when the component unmounts
      clearInterval(interval);
    };
  }, [currentIndex, data]);

  return <>{data[currentIndex]}</>;
}

export default RandomQuotes;
