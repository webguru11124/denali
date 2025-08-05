import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { Input2, TablePageContainer } from 'app/components';
import { useRouteId, useSelector } from 'app/hooks';
import useImageSource from 'app/hooks/useImageSource';
import { selectors } from 'app/store/channels';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import { Popover } from 'react-tiny-popover';

import ArticlesList from './components/ArticlesList';
import FilterAndSort from './components/FilterAndSort';
import SearchedArticlesList from './components/SearchedArticlesList';
import SkeletonBox from './components/Skeleton';
import { ChannelViewContextProvider, useChannelViewContext } from './context';

const CoverImage = styled.img`
  -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0)
    ),
    linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  -webkit-mask-size: 100%;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: top bottom;
`;

const SearchPopup = styled.div`
  box-shadow: 0px 12px 12px rgba(112, 112, 112, 0.1);
`;

const GradientText = styled.span`
  background: linear-gradient(133.41deg, #323493 -0.08%, #df9e9c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const ChannelViewContent = () => {
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const {
    setChannelId,
    setSearch,
    searchedArticles,
    channel,
    articles,
    articlesLoading,
    channelLoading,
  } = useChannelViewContext();

  const relevantChannels = useSelector(selectors.getRelevantChannels);

  const routeId = useRouteId();

  const { hasError, imageSource, setHasError, setHasLoaded } = useImageSource(
    String(channel?.coverImage?.url)
  );

  const setSearchValue = debounce((value: string) => setSearch(value), 500);

  useEffect(() => {
    if (routeId && typeof routeId === 'number') {
      setChannelId(routeId);
    }
  }, [routeId, setChannelId]);

  const mainLanguage =
    Object.keys(channel?.title ?? {}).find(
      (l) => channel?.title[l].isDefault
    ) ?? 'en';

  const relevantChannel = relevantChannels.find((rc) => rc.id === routeId);

  const loading =
    (channelLoading || articlesLoading) && (!!channel || !!articles);

  const loaded = !articlesLoading && !channelLoading && !!channel && !!articles;

  return (
    <TablePageContainer className="pl-0 pt-0 pr-6">
      <div className="grid grid-cols-8 gap-y-8 gap-x-4">
        <SkeletonBox
          enabled={loading}
          full={!loading}
          className={cx('col-span-8 pt-16 pb-0 px-8 relative rounded-tr-2xl', {
            'bg-gradient-to-b from-hover-blue to-transparent': loaded,
            'bg-[linear-gradient(to_bottom,#f3f4f8_78%,transparent_22%)]':
              !loaded,
          })}
        >
          {imageSource && (
            <div className="absolute top-0 right-0 h-full overflow-hidden">
              <CoverImage
                className={cx('h-[80%] w-[280px] object-cover rounded-r-2xl', {
                  'opacity-0': !loaded || hasError,
                  'opacity-100': loaded && !hasError,
                })}
                src={imageSource}
                alt={imageSource}
                onLoad={() => {
                  setHasLoaded(true);
                  setHasError(false);
                }}
                onError={() => setHasError(true)}
              />
            </div>
          )}

          <h2
            className={cx('text-xl font-bold mb-3', { 'opacity-0': !loaded })}
          >
            {channel?.title[mainLanguage].title ?? (
              <span className="opacity-0">Title</span>
            )}
          </h2>
          <div
            className={cx('inline-flex gap-6 mb-6 ', { 'opacity-0': !loaded })}
          >
            <span className="text-grayscale-primary opacity-50">
              {relevantChannel?.articleCount ?? 0} articles
            </span>
            <GradientText>
              {relevantChannel?.seenArticleCount ?? 0} unread
            </GradientText>
          </div>
          <Popover
            isOpen={searchInputFocused && (searchedArticles ?? []).length > 0}
            onClickOutside={() => {
              setSearchInputFocused(false);
            }}
            positions={['bottom']}
            content={({ childRect }) => {
              return (
                <SearchPopup
                  className="w-full rounded-b-lg bg-white"
                  style={{ width: childRect.width }}
                >
                  <SearchedArticlesList />
                </SearchPopup>
              );
            }}
          >
            <div className="grow">
              <Input2
                height={30}
                name="search"
                placeholder="Search for article"
                isSearch
                onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
                onClear={() => setSearchValue('')}
                onFocus={() => setSearchInputFocused(true)}
              />
            </div>
          </Popover>
          <span
            className={cx('block text-sm text-grayscale-secondary mt-2', {
              'opacity-0': !loaded,
            })}
          >
            Results found: {(articles ?? []).length}
          </span>
        </SkeletonBox>

        <div className="col-span-2 pb-6 px-8">
          <FilterAndSort />
        </div>
        <div className="col-span-6 pb-6 px-8">
          <ArticlesList />
        </div>
      </div>
    </TablePageContainer>
  );
};

const ChannelView = () => {
  return (
    <ChannelViewContextProvider>
      <ChannelViewContent />
    </ChannelViewContextProvider>
  );
};

export default ChannelView;
