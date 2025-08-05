import { cx } from '@emotion/css';
import { ReactNode } from 'react';
import { RemixiconReactIconComponentType } from 'remixicon-react';

interface PostDataProps {
  Icon: RemixiconReactIconComponentType;
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  iconClassName?: string;
}

interface WrapperProps {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

const Wrapper = ({ children, onClick, disabled }: WrapperProps) => {
  if (onClick) {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className="flex items-center"
        type="button"
      >
        {children}
      </button>
    );
  }

  return <span>{children}</span>;
};

const PostData = ({
  Icon,
  label,
  className,
  onClick,
  disabled,
  iconClassName,
}: PostDataProps) => (
  <div className={cx('flex items-center text-grayscale-secondary', className)}>
    <Wrapper disabled={disabled} onClick={onClick}>
      <Icon className={cx('w-6 h-6 mr-1', iconClassName)} />
      <span className="text-xs">{label}</span>
    </Wrapper>
  </div>
);

export default PostData;
