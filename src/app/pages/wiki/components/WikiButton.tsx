import { cx, css } from '@emotion/css';
import { routes } from 'app/router';
import { Link } from 'react-router-dom';
import RightArrowIcon from 'remixicon-react/ArrowRightSLineIcon';

import { formatChildCountTitle } from '../utils';

import WikiButtonImage from './WikiButtonImage';

interface Props {
  hasChild: boolean;
  className?: string;
  iconSrcSet?: string;
  iconSrc?: string;
  title: string;
  excerpt: string;
  id: number;
  childCount: number;
}

const WikiButton = ({
  hasChild,
  className,
  iconSrcSet,
  iconSrc,
  title,
  excerpt,
  id,
  childCount,
}: Props) => {
  const hasIcon = Boolean(iconSrc) || Boolean(iconSrcSet);
  return (
    <div className={cx('h-18', className)}>
      <div className="relative">
        {hasChild && (
          <div
            className={cx(
              'absolute w-full mt-2 ml-2 h-18',
              css`
                z-index: -10;
              `
            )}
          >
            <div className="w-full h-full shadow-card rounded-lg">
              <div className="w-21 h-full bg-secondary rounded-l-lg" />
            </div>
          </div>
        )}
      </div>
      <Link
        to={routes.wikiArticle.create(id)}
        className="rounded-lg w-full bg-white flex shadow-card z-10 h-full"
      >
        <div
          className={cx(
            ' flex items-center overflow-hidden justify-center  h-full w-21 rounded-l-lg',
            {
              'bg-secondary': !hasIcon,
            }
          )}
        >
          <WikiButtonImage
            srcSet={iconSrcSet}
            hasChild={hasChild}
            src={iconSrc}
          />
        </div>
        <div className="ml-4 py-4">
          <span className="text-grayscale-primary font-bold text-sm block line-clamp-1">
            {title}
          </span>
          <span className="text-xs text-grayscale-secondary line-clamp-1">
            {hasChild ? formatChildCountTitle(childCount) : excerpt}
          </span>
        </div>
        <div className="ml-auto flex items-center mr-4">
          <span className="p-1 bg-gray-light rounded">
            <RightArrowIcon className="text-grayscale-secondary" />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default WikiButton;
