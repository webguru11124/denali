import { cx } from '@emotion/css';

interface TabIndicatorProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const TabIndicator = ({ label, selected, onClick }: TabIndicatorProps) => {
  return (
    <button
      className="mr-8 flex flex-col relative"
      onClick={selected ? undefined : onClick}
    >
      <span
        className={cx('inline-block p-2', {
          'text-grayscale-primary': selected,
          'text-grayscale-secondary': !selected,
        })}
      >
        {label}
      </span>
      <div
        className={cx(
          'w-full h-[3px] bg-focus rounded absolute bottom-[-2px]',
          {
            invisible: !selected,
          }
        )}
      ></div>
    </button>
  );
};

export default TabIndicator;
