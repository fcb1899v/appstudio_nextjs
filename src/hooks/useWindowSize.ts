import { useEffect, useState } from 'react';

/**
 * Interface for window dimensions
 * Defines the structure for window width and height
 */
interface WindowSize {
  width: number;
  height: number;
}

/**
 * Custom hook for tracking window size changes
 * Provides responsive design support by monitoring window dimensions
 * @returns Object containing window size and client-side mount status
 */
export const useWindowSize = () => {
  // State for storing current window dimensions
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 });
  
  // State to track if component is mounted on client side
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark component as mounted on client side
    setIsClient(true);
    
    /**
     * Function to update window size state
     * Updates state with current window dimensions
     */
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    
    // Set initial window size
    handleResize();
    
    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { windowSize, isClient };
}; 