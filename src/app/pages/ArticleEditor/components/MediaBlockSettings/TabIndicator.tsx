import { cx } from '@emotion/css';
import a11yKeydown from 'app/utils/a11y/keydown';

interface TabIndicatorProps {
  text: string;
  visible: boolean;
  onClick: () => void;
  className?: string;
}

const TabIndicator = ({
  text,
  visible,
  onClick,
  className,
}: TabIndicatorProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className={cx(className || '', { 'border-b-2 border-focus': visible })}
      onClick={onClick}
      onKeyDown={visible ? undefined : (e) => a11yKeydown(e, onClick)}
    >
      <span
        className={cx('inline-block py-2', {
          'text-grayscale-primary bold': visible,
          'text-grayscale-secondary': !visible,
        })}
      >
        {text}
      </span>
    </div>
  );
};
export default TabIndicator;
