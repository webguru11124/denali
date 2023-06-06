import { useState, useEffect } from 'react';

const SCREEN_SIZES = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1563,
};

export type ScreenBreakpoint = keyof typeof SCREEN_SIZES;

const resolveBreakpoint = (size: number): ScreenBreakpoint => {
  const breakpointKeys = Object.keys(SCREEN_SIZES).reverse();
  const breakpoint = breakpointKeys.find(
    (key: string) => size > SCREEN_SIZES[key as ScreenBreakpoint]
  );

  if (!breakpointKeys.includes(String(breakpoint))) return '2xl';

  return breakpoint as ScreenBreakpoint;
};

const useScreenBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<ScreenBreakpoint>(
    resolveBreakpoint(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(resolveBreakpoint(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

export default useScreenBreakpoint;
