import { cx } from '@emotion/css';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface Link {
  to: string;
  label: string;
  isActive: boolean;
}

interface CategoryLinksProps {
  links: Array<Link>;
}

interface StyledLinkProps {
  isActive: boolean;
  className?: string;
  to: string;
  label: string;
}

const StyledLink: React.FC<StyledLinkProps> = ({ isActive, to, label }) => (
  <RouterLink
    to={to}
    className={cx(
      'flex-grow text-left pb-3',
      isActive
        ? 'font-bold border-b-3 border-focus'
        : 'border-b border-gray-dark'
    )}
  >
    {label}
  </RouterLink>
);

const CategoryLinks: FC<CategoryLinksProps> = ({ links }) => (
  <div className="flex">
    {links.map(({ to, label, isActive }, index) => (
      <StyledLink
        key={index.toString()}
        to={to}
        label={label}
        isActive={isActive}
      />
    ))}
  </div>
);

export default CategoryLinks;
