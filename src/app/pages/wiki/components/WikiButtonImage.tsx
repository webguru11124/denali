import { cx } from '@emotion/css';
import { FC } from 'react';
import BookletIcon from 'remixicon-react/BookletLineIcon';
import FileIcon from 'remixicon-react/FileList2LineIcon';

interface Props {
  hasChild: boolean;
  srcSet?: string;
  src?: string;
  alt?: string;
  iconClassName?: string;
  imageClassName?: string;
}

const WikiButtonImage: FC<Props> = ({
  srcSet,
  src,
  hasChild,
  iconClassName,
  imageClassName,
  alt,
}) => {
  if (srcSet || src)
    return (
      <div className="h-full w-full flex">
        <img
          className={cx('object-cover', imageClassName)}
          srcSet={srcSet}
          src={src}
          alt={alt}
        />
      </div>
    );

  const Icon = hasChild ? BookletIcon : FileIcon;
  return <Icon className={cx('text-white', iconClassName)} />;
};

export default WikiButtonImage;
