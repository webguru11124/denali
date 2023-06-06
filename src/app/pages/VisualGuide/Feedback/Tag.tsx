import { cx } from '@emotion/css';
import { ResponsiveMediaSizes } from 'app/api/types';
import { useScreenBreakpoint } from 'app/hooks';
import { createSrcSet } from 'app/utils';
import { ReactNode } from 'react';

interface TagProps {
  name: string;
  avatars: ResponsiveMediaSizes;
  onClick?: () => void;
  isSelected: boolean;
  isButton: boolean;
}

interface ContainerProps {
  isButton: boolean;
  isSelected: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const Container = ({
  isButton,
  children,
  onClick,
  isSelected,
}: ContainerProps) => {
  const className = cx(
    'flex pr-4 w-full h-10 border hover:bg-focus-background rounded-full overflow-hidden items-center',
    isSelected
      ? 'bg-focus-background border-focus border'
      : 'border-transparent bg-grayscale-bg-dark'
  );

  if (isButton) {
    return (
      <button className={className} type="button" onClick={onClick}>
        {children}
      </button>
    );
  }

  return <div className={className}>{children}</div>;
};

const Tag = ({ avatars, name, onClick, isButton, isSelected }: TagProps) => {
  const breakpoint = useScreenBreakpoint();

  return (
    <Container isButton={isButton} isSelected={isSelected} onClick={onClick}>
      <span className="h-10 w-10 block mr-2">
        <img
          srcSet={createSrcSet(avatars)}
          alt={name}
          style={{
            height: '43px',
          }}
          className="w-full h-full object-cover"
        />
      </span>
      <span className="text-sm text-focus">
        <span className="line-clamp-1">{name}</span>
      </span>
    </Container>
  );
};
export default Tag;
