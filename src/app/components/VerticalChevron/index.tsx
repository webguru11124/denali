import { cx } from '@emotion/css';
import { ArrowDown2 } from 'iconsax-react';
import { MouseEventHandler, MouseEvent, useState } from 'react';
interface VerticalChevronProps {
  open?: boolean;
  disabled?: boolean;
  className?: string;
  size?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const VerticalChevron = ({
  open,
  disabled = false,
  className,
  size,
  onClick,
}: VerticalChevronProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const click = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (open === undefined) {
      setIsOpen((prev) => !prev);
    }
    onClick?.(e);
  };

  return (
    <button
      className="flex items-center justify-center"
      onClick={click}
      disabled={disabled}
      type="button"
    >
      <ArrowDown2
        size={size}
        className={cx('transform', { 'rotate-180': open ?? isOpen }, className)}
      />
    </button>
  );
};

export default VerticalChevron;
