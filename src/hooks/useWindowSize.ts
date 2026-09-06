import { useSyncExternalStore } from 'react';

/**
 * Interface for window dimensions
 * Defines the structure for window width and height
 */
interface WindowSize {
  width: number;
  height: number;
}

// The server has no window, and the snapshot has to be referentially stable or
// React re-renders forever comparing a fresh object against the last one.
const SERVER_SIZE: WindowSize = { width: 0, height: 0 };

// One window, so one cache. A new object is built only when the size actually
// changed, which is what keeps getSnapshot stable between resizes.
let cachedSize: WindowSize = SERVER_SIZE;

const subscribeToResize = (onChange: () => void) => {
  window.addEventListener('resize', onChange, { passive: true });
  return () => window.removeEventListener('resize', onChange);
};

const getWindowSize = (): WindowSize => {
  if (cachedSize.width !== window.innerWidth || cachedSize.height !== window.innerHeight) {
    cachedSize = { width: window.innerWidth, height: window.innerHeight };
  }
  return cachedSize;
};

const getServerWindowSize = (): WindowSize => SERVER_SIZE;

// Constant per environment, so the store never notifies.
const subscribeToNothing = () => () => {};
const onClient = () => true;
const onServer = () => false;

/**
 * Custom hook for tracking window size changes
 * Provides responsive design support by monitoring window dimensions
 *
 * Reads through useSyncExternalStore rather than mirroring the window into
 * state from an effect. The effect version rendered once with zeros before
 * correcting itself; this one has the real size on the first render after
 * hydration.
 *
 * @returns Object containing window size and client-side mount status
 */
export const useWindowSize = () => {
  const windowSize = useSyncExternalStore(subscribeToResize, getWindowSize, getServerWindowSize);
  const isClient = useSyncExternalStore(subscribeToNothing, onClient, onServer);

  return { windowSize, isClient };
};
