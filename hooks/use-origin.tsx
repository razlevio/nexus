import { useEffect, useState } from "react";

/**
 * Custom hook to retrieve the origin (protocol + hostname + port) of the current page.
 * It ensures that it only returns the origin after the component has mounted to avoid issues with server-side rendering.
 *
 * @returns {string} The origin of the current page, or an empty string if not yet mounted or if running server-side.
 */
export const useOrigin = () => {
  // State to track if the component has mounted.
  const [mounted, setMounted] = useState(false);

  // Define the origin based on the window's location if available.
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    // Set the component as mounted when the effect runs after initial render.
    setMounted(true);
  }, []); // Empty dependency array means this runs once after the initial render.

  // Return an empty string until the component has mounted to avoid SSR issues.
  if (!mounted) {
    return "";
  }

  // Return the origin once the component has mounted.
  return origin;
};