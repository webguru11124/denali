import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { WikiArticleListItemProps } from 'app/api/wiki/types';
import Truncate from 'app/components/Truncate';
import { routes } from 'app/router';
import { createSrcSet } from 'app/utils';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { formatChildCountTitle } from '../utils';

import WikiButtonImage from './WikiButtonImage';

const Header = styled.div`
  height: 170px;
`;

const Content = styled.div`
  height: 120px;
`;

interface Props {
  article: WikiArticleListItemProps;
  className?: string;
}

const WikiCard = ({ article, className }: Props) => {
  const hasIcon = Boolean(article.iconSizes);
  const [isShowTwoLine, setShowTwoLine] = useState(false);
  const onTitleTruncate = (isTruncated: boolean, isOverOneLine: boolean) => {
    if (!isTruncated) {
      setShowTwoLine(!isOverOneLine);
    }
  };

  return (
    <div className={cx('rounded-xl shadow-atobi', className)}>
      <Link to={routes.wikiArticle.create(article.id)}>
        <div className="flex flex-col">
          <Header
            className={cx(
              'w-full flex rounded-t-lg justify-center items-center',
              {
                'bg-secondary': !hasIcon,
              }
            )}
          >
            <WikiButtonImage
              alt={article.title}
              src={article.icon}
              srcSet={
                article.iconSizes ? createSrcSet(article.iconSizes) : undefined
              }
              hasChild={article.hasChild}
              imageClassName="w-full h-full rounded-t-lg"
              iconClassName="w-12 h-12"
            />
          </Header>
          <Content className="p-4">
            <div className="text-lg text-grayscale-primary">
              <Truncate
                ellipsis="..."
                lines={2}
                trimWhitespace
                width={180}
                onTruncate={onTitleTruncate}
              >
                {article.title}
              </Truncate>
            </div>
            <div className="mt-3 text-sm text-grayscale-secondary">
              <Truncate
                ellipsis="..."
                lines={isShowTwoLine ? 2 : 1}
                trimWhitespace
                width={180}
              >
                {article.hasChild
                  ? formatChildCountTitle(article.childCount)
                  : article.excerpt}
              </Truncate>
            </div>
          </Content>
        </div>
      </Link>
    </div>
  );
};

export default WikiCard;
