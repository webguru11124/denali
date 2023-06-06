import { cx } from '@emotion/css';

interface ButtonProps {
  text: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}

const TabButton = ({ text, selected, disabled, onClick }: ButtonProps) => {
  return (
    <button
      className={cx('flex items-end rounded-sm', {
        'bg-focus-background': selected && !disabled,
      })}
      onClick={selected ? undefined : onClick}
      disabled={disabled}
    >
      <span
        className={cx('inline-block mx-1 px-1 py-0.5', {
          'text-focus border-b-2 border-focus': selected && !disabled,
          'text-grayscale-primary': !selected && !disabled,
          'text-grayscale-secondary': disabled,
        })}
      >
        {text}
      </span>
    </button>
  );
};

export default TabButton;
