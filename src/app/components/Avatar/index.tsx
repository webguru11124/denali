import { cx } from '@emotion/css';
import { routes } from 'app/router';
import React from 'react';
import { Link } from 'react-router-dom';

interface AvatarProps {
  src?: string;
  srcSet?: string;
  alt: string;
  className?: string;
  id: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, className, id, srcSet }) => {
  if (!src && !srcSet)
    throw new Error(
      'Avatar: One of the attributes has to be defined: src / srcSet'
    );
  return (
    <Link to={routes.user.create(id)}>
      <img
        className={cx('rounded-lg', className)}
        {...(srcSet ? { srcSet } : { src })}
        alt={alt}
      />
    </Link>
  );
};

export default Avatar;
