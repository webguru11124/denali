import { cx } from '@emotion/css';
import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { RemixiconReactIconComponentType } from 'remixicon-react';

interface StyledNavLinkProps extends NavLinkProps {
  Icon: RemixiconReactIconComponentType;
  badge?: string | number;
  isClipped: boolean;
}

const NavigationLink: React.FC<StyledNavLinkProps> = ({
  children,
  Icon,
  badge,
  isClipped,
  ...restProps
}) => (
  <NavLink
    className={(isActive) =>
      cx('overflow-hidden rounded py-3 px-4 mb-1 flex text-sm items-center', {
        'hover:bg-hover-blue': !isActive,
      })
    }
    activeClassName="bg-focus-background hover:bg-focus-background text-focus"
    {...restProps}
  >
    <div className="flex justify-center items-center w-6 h-6 mr-2">
      <Icon />
    </div>

    <span className={cx(isClipped ? 'opacity-0 transition-all' : 'flex-1')}>
      {children}
    </span>
    {Boolean(badge) && !isClipped && (
      <span className="rounded-full ml-auto text-white bg-error w-6 h-4 flex items-center justify-center text-xs">
        {badge}
      </span>
    )}
  </NavLink>
);

export default NavigationLink;
