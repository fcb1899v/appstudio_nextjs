import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { windowSize, isClient };
}; 