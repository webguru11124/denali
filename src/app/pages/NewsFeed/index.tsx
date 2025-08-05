import { cx } from '@emotion/css';
import {
  SelectBox,
  Tag,
  Container,
  SearchInput,
  Feature,
} from 'app/components';
import { useNewsTranslation } from 'app/internationalization/hooks';
import { routes, constants } from 'app/router';
import React, { useState, useEffect } from 'react';
import { Link, LinkProps, useParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import ExpiredNewsList from './ExpiredNewsList';
import NewsList from './NewsList';
import useCategoriesQuery from './useCategoriesQuery';
import useExpiredNewsQuery from './useExpiredNewsQuery';
import useNewsFeedQuery from './useNewsFeedQuery';

interface StyledLinkProps extends LinkProps {
  isActive: boolean;
}

const StyledLink = ({ className, isActive, ...restProps }: StyledLinkProps) => (
  <Link
    className={cx(
      'flex-grow text-left pb-3',
      className,
      isActive
        ? 'font-bold border-b-3 border-focus'
        : 'border-b border-gray-dark text-grayscale-secondary'
    )}
    {...restProps}
  />
);

const NewsFeed = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [resultsAmount, setResultsAmount] = useState<number>(0);
  const { data: categories } = useCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { category } = useParams<{ category: 'expired' | 'relevant' }>();
  const [debouncedSearchValue] = useDebounce(searchValue, 500);
  const { t } = useNewsTranslation();

  const { data: newsFeed, isLoading: isNewsFeedLoading } = useNewsFeedQuery({
    query: debouncedSearchValue,
    category: selectedCategory,
    enabled: category === constants.newsTypes.relevant,
  });

  const {
    data: expiredNews,
    isLoading: isExpiredNewsLoading,
    fetchNext: fetchNextExpired,
    meta: expiredNewsMeta,
  } = useExpiredNewsQuery({
    query: debouncedSearchValue,
    category: selectedCategory,
    enabled: category === constants.newsTypes.expired,
  });

  useEffect(() => {
    if (category === constants.newsTypes.relevant) {
      return setResultsAmount(newsFeed?.length || 0);
    }

    if (category === constants.newsTypes.expired) {
      return setResultsAmount(expiredNewsMeta?.total || 0);
    }

    return undefined;
  }, [category, expiredNewsMeta, newsFeed]);

  const currentCategory = categories?.find(
    ({ id }) => id === Number(selectedCategory)
  );

  return (
    <div className="container mx-auto h-full">
      <Container className="flex flex-col mx-auto mt-8 mb-8 h-full">
        <div className="flex mb-6">
          <div className="flex-grow w-1/2 pr-12">
            <SearchInput
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              onClear={() => setSearchValue('')}
            />
            {Boolean(resultsAmount) &&
              (debouncedSearchValue || selectedCategory) && (
                <span className="text-grayscale-secondary min-h-4 block mt-2 text-xs">
                  {t('Results found {{count}}', {
                    count: resultsAmount,
                  })}
                </span>
              )}
          </div>
          <div className="flex-grow w-1/2 pl-3">
            <SelectBox
              onChange={(value: string) => {
                // If the same value is selected twice -> unset it
                setSelectedCategory(value !== selectedCategory ? value : '');
              }}
              value={selectedCategory}
              placeholder="Category"
              options={
                categories?.map(({ id, title }) => ({
                  value: String(id),
                  label: title,
                })) || []
              }
              optionsContainerClassName="max-h-screen-75"
            />
          </div>
        </div>
        {currentCategory && (
          <div className="h-6 mb-4">
            <Tag onDelete={() => setSelectedCategory('')}>
              {currentCategory.title}
            </Tag>
          </div>
        )}
        <div className="flex">
          <StyledLink
            isActive={category === constants.newsTypes.relevant}
            to={routes.newsFeed.create(constants.newsTypes.relevant)}
          >
            {t('Latest News')}
          </StyledLink>
          <StyledLink
            isActive={category === constants.newsTypes.expired}
            to={routes.newsFeed.create(constants.newsTypes.expired)}
          >
            {t('Archived News')}
          </StyledLink>
        </div>
        {category === constants.newsTypes.relevant && (
          <NewsList
            news={newsFeed}
            isLoading={isNewsFeedLoading}
            debouncedQuery={debouncedSearchValue}
            category={selectedCategory}
            query={searchValue}
          />
        )}
        {category === constants.newsTypes.expired && (
          <ExpiredNewsList
            isLoading={isExpiredNewsLoading}
            meta={expiredNewsMeta}
            news={expiredNews}
            fetchNext={fetchNextExpired}
            debouncedQuery={debouncedSearchValue}
            category={selectedCategory}
            query={searchValue}
          />
        )}
      </Container>
    </div>
  );
};

const FeaturedNewsFeed = () => (
  <Feature feature="news" activeComponent={NewsFeed} />
);

export default FeaturedNewsFeed;
