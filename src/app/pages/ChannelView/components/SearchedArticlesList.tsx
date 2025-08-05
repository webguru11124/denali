import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { PageLoader } from 'app/components';
import useImageSource from 'app/hooks/useImageSource';
import { Gallery } from 'iconsax-react';
import { BasicArticleInfo } from 'submodules/common-ui/generated/api/gcs';

import { useChannelViewContext } from '../context';

const ItemContainer = styled.div``;

const SearchedArticleItem = ({
  article,
  onClick,
}: {
  article: BasicArticleInfo;
  onClick: () => void;
}) => {
  const mainLanguage =
    article.languages.find((l) => l.isDefault)?.language || 'en';

  const { hasError, hasLoaded, imageSource, setHasError, setHasLoaded } =
    useImageSource(article.variants[mainLanguage].coverImage.url);

  return (
    <ItemContainer
      onClick={onClick}
      className="flex gap-4 items-center cursor-pointer relative"
    >
      {!hasLoaded && !hasError && (
        <div className="h-10 w-18 flex justify-center items-center">
          <PageLoader />
        </div>
      )}
      {imageSource && (
        <img
          className={cx(
            'h-10 w-18 rounded border-2 border-white drop-shadow-[0_0_12px_rgba(112,112,112,0.1)] object-cover',
            {
              hidden: (!hasLoaded && !hasError) || hasError,
            }
          )}
          src={imageSource}
          alt={imageSource}
          onLoad={() => {
            setHasLoaded(true);
            setHasError(false);
          }}
          onError={() => setHasError(true)}
        />
      )}
      {(hasError || !imageSource) && (
        <div className="flex h-10 w-18 items-center justify-center bg-hover-blue text-focus rounded">
          <Gallery size={24} />
        </div>
      )}
      <p>{article.variants[mainLanguage].title}</p>
    </ItemContainer>
  );
};

const SearchedArticlesList = () => {
  const { navigateToArticle, searchedArticles } = useChannelViewContext();

  return (
    <div className="px-6 py-4 flex flex-col gap-2">
      {searchedArticles?.map((article) => {
        return (
          <SearchedArticleItem
            article={article}
            onClick={() => navigateToArticle(article.id)}
          />
        );
      })}

      <span className="block text-sm text-grayscale-secondary">
        Results found: {searchedArticles?.length ?? 0}
      </span>
    </div>
  );
};

export default SearchedArticlesList;
