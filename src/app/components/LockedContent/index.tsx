import { cx, css } from '@emotion/css';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import LockIcon from 'remixicon-react/Lock2LineIcon';

interface LockedContentProps {
  isLocked: boolean;
  className?: string;
  progress?: number;
  label?: string | JSX.Element;
  iconClassName?: string;
  children: ReactNode;
}

const PROGRESS_BAR_WIDTH = 90;

const ProgressContainer = styled.div`
  width: ${PROGRESS_BAR_WIDTH}px;
`;

const LockedContentContainer = styled.div`
  background-color: rgba(210, 206, 205, 0.95);
`;

const LockedContent = ({
  children,
  className,
  isLocked,
  progress,
  label,
  iconClassName,
}: LockedContentProps) => (
  <div className="w-full relative">
    {isLocked && (
      <LockedContentContainer
        className={cx(
          'w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center',
          className
        )}
      >
        <LockIcon className={cx('text-white w-16 h-16', iconClassName)} />
        {label && <div className="text-white">{label}</div>}
        {progress !== undefined && (
          <ProgressContainer className="h-2 bg-white mt-2 rounded-xl">
            <div
              className={cx(
                'bg-success h-full rounded-xl',
                css`
                  width: ${progress * 100}%;
                `
              )}
            />
          </ProgressContainer>
        )}
      </LockedContentContainer>
    )}
    {children}
  </div>
);

export default LockedContent;
