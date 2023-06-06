import { ScreenBreakpoint } from 'app/hooks/useScreenBreakpoint';

const DESKTOP_SIZES = ['xl', '2xl'];

const isMobile = (breakpoint: ScreenBreakpoint) =>
  !DESKTOP_SIZES.includes(String(breakpoint));

export default isMobile;
