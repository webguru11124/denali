import { KeyboardEvent } from 'react';

const a11yKeydown = (event: KeyboardEvent, callback: () => void): void => {
  if (!event) return;

  if (event.code === 'Space' || event.code === 'Enter') {
    callback();
  }
};
export { a11yKeydown };
export default a11yKeydown;
