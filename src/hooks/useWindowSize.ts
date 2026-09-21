import { useSyncExternalStore } from 'react';

/** Window width and height. */
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

/** Window size hook. Reads via useSyncExternalStore so the real size is available on the
 * first render after hydration; an effect-based version rendered once with zeros. */
export const useWindowSize = () => {
  const windowSize = useSyncExternalStore(subscribeToResize, getWindowSize, getServerWindowSize);
  const isClient = useSyncExternalStore(subscribeToNothing, onClient, onServer);

  return { windowSize, isClient };
};
