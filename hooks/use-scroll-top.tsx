import { useState, useEffect } from "react";

/**
 * Custom hook to determine if the page has been scrolled past a certain threshold.
 * 
 * @param {number} threshold - The number of pixels the page must be scrolled vertically before `scrolled` is set to true. Defaults to 10.
 * @returns {boolean} scrolled - A stateful value that indicates whether the page has been scrolled past the defined threshold.
 */
export function useScrollTop(threshold = 10) {
  // State to track if the page has been scrolled past the threshold.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Function to handle the scroll event.
    const handleScroll = () => {
      // Check if the vertical scroll position is greater than the threshold.
      if (window.scrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add the scroll event listener.
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener when the component unmounts or dependencies change.
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]); // Re-run the effect if the threshold changes.

  // Return the scrolled state.
  return scrolled;
}
