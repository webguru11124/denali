import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { ComplaintTypes } from 'app/api/complaints/constants';
import BlockingContext from 'app/blockings/context';
import {
  useNewsTranslation,
  useCommonTranslation,
} from 'app/internationalization/hooks';
import { getPlainText, dayjs, createSrcSet } from 'app/utils';
import React, { useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RemixiconReactIconComponentType } from 'remixicon-react';
import CommentIcon from 'remixicon-react/Chat1LineIcon';
import EyeLineIcon from 'remixicon-react/EyeLineIcon';

import Avatar from '../Avatar';

const MAX_DESCRIPTION_LENGTH = 160;

const formatDescription = (description: string) => {
  if (description.length < MAX_DESCRIPTION_LENGTH) return description;

  return `${description.substr(0, MAX_DESCRIPTION_LENGTH)}...`;
};

const UnseenIndicator = styled.div`
  left: -64px;
`;

interface DataItemProps {
  icon: RemixiconReactIconComponentType;
  data: number;
  className?: string;
}

const DataItem: React.FC<DataItemProps> = ({ icon: Icon, data, className }) => (
  <div className={cx('flex items-center', className)}>
    <Icon className="w-5 h-5" /> <span className="ml-1 text-sm">{data}</span>
  </div>
);

interface NewsCardProps {
  id: number;
  title: string;
  description: string;
  className?: string;
  avatars: any;
  createdAt: any;
  userName: string;
  category: string;
  seenByCount: number;
  commentsCount: number;
  seenByMe: boolean;
  isMarkdown: boolean;
  userId: number;
  to: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  description,
  className,
  avatars,
  createdAt,
  userName,
  category,
  seenByCount,
  commentsCount,
  seenByMe,
  isMarkdown,
  userId,
  to,
}) => {
  const rawDescription = getPlainText(description, isMarkdown);
  const { t } = useNewsTranslation();
  const { t: tCommon } = useCommonTranslation();

  const { isHiddenOrBlocked } = useContext(BlockingContext);
  const isHidden = useMemo(
    () => isHiddenOrBlocked(id, userId, ComplaintTypes.newsFeed),
    [id, userId, isHiddenOrBlocked]
  );

  return (
    <Link
      to={to}
      className={cx(
        'bg-blue-100 py-4 px-8 shadow-atobi rounded-lg flex',
        !seenByMe && 'bg-focus-background',
        className
      )}
    >
      <div className="flex relative">
        {!seenByMe && (
          <UnseenIndicator className="w-3 h-3 rounded-full bg-focus absolute top-1/2 left-0 transform -translate-y-1/2" />
        )}

        <div>
          <Avatar
            className="w-12 h-12 min-w-12 max-w-12 rounded-lg"
            alt={title}
            srcSet={createSrcSet(avatars)}
            id={userId}
          />
        </div>
      </div>
      <div className="ml-3">
        <div className="flex flex-col mb-3 text-sm text-grayscale-secondary">
          <span className="mb-1">{category}</span>
          <span>
            {t('{{date}} by {{name}}', {
              date: dayjs(createdAt).format('MMM Do'),
              name: userName,
            })}
          </span>
        </div>
        <p className="text-lg font-bold mb-2 line-clamp-2">{title}</p>
        {isHidden ? (
          <div className="text-grayscale-secondary mt-2">
            {tCommon('This post has been hidden.')}
          </div>
        ) : (
          <p
            className={cx('text-sm mt-2 break-all line-clamp-1  relative', {
              'font-bold': !seenByMe,
              'pr-18': rawDescription.length > MAX_DESCRIPTION_LENGTH,
            })}
          >
            {formatDescription(rawDescription)}{' '}
            {rawDescription.length > MAX_DESCRIPTION_LENGTH && (
              <p className="text-focus font-bold absolute top-0 right-0">
                {t('read more')}
              </p>
            )}
          </p>
        )}

        <div className="text-grayscale-secondary flex mt-4">
          <DataItem icon={CommentIcon} data={commentsCount} />
          <DataItem icon={EyeLineIcon} className="ml-6" data={seenByCount} />
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
