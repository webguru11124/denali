import { css, cx } from '@emotion/css';
import styled from '@emotion/styled';
import { ReactNode, useEffect, useState } from 'react';
import ArrowDownIcon from 'remixicon-react/ArrowDownSLineIcon';
import ArrowUpIcon from 'remixicon-react/ArrowUpSLineIcon';
import useResizeObserver from 'use-resize-observer';

const Shadow = styled.div`
  box-shadow: 0px -25px 40px 25px rgb(255, 255, 255);
`;

interface HideableContentProps {
  maxHeight?: number;
  isCollapsable?: boolean;
  children: ReactNode;
}

const HideableContent = ({
  children,
  maxHeight,
  isCollapsable = true,
}: HideableContentProps) => {
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const { ref, height } = useResizeObserver<HTMLDivElement>();
  const [shouldDisplayCollapseButton, setShouldDisplayCollapseButton] =
    useState(isCollapsable);

  useEffect(() => {
    const isHeightExceedingMax = Boolean(
      maxHeight && height && isCollapsable && height > maxHeight
    );
    setShouldDisplayCollapseButton(isHeightExceedingMax);
  }, [height, maxHeight, isCollapsable]);

  const isCollapsed = !shouldDisplay && isCollapsable;
  return (
    <div>
      <div
        className={cx(
          'overflow-hidden transition-all duration-300',
          css`
            height: ${shouldDisplayCollapseButton && isCollapsed
              ? maxHeight
              : height}px;
          `
        )}
      >
        <div ref={ref}>{children}</div>
      </div>

      {shouldDisplayCollapseButton && isCollapsable && (
        <>
          {isCollapsed && <Shadow className="w-full relative" />}
          <div className="w-full mt-6 relative border-b border-gray-light">
            <button
              type="button"
              onClick={() => setShouldDisplay((prev) => !prev)}
              className="absolute rounded-lg border-grayscale-bg-dark border -translate-x-1/2 shadow-card text-grayscale-secondary flex items-center justify-center w-10 h-10 bg-light z-10 top-0 left-1/2 transform -translate-y-1/2"
            >
              {shouldDisplay ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default HideableContent;
