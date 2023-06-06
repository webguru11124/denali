import { cx, css } from '@emotion/css';
import { useScreenBreakpoint } from 'app/hooks';
import { selectors } from 'app/store/navigation';
import { isMobile } from 'app/utils';
import { HTMLAttributes } from 'react';
import { useSelector } from 'react-redux';

const TablePageContainer = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  const breakpoint = useScreenBreakpoint();
  const isSidebarOpen = useSelector(selectors.getIsSidebarOpen);

  return (
    <div
      className={cx(
        'flex flex-col flex-1 py-6 px-6 h-full lg:duration-300',
        className,
        css({
          marginLeft: isMobile(breakpoint)
            ? '0px'
            : isSidebarOpen
            ? '225px'
            : '70px',
        })
      )}
    >
      {children}
    </div>
  );
};

export default TablePageContainer;
