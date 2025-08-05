import useGetArticlesQuery from 'app/api/articles/hooks/useArticles';
import useGetChannelQuery from 'app/api/channels/hooks/useChannel';
import { routes } from 'app/router';
import isEqual from 'lodash/isEqual';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
  BasicArticleInfo,
  BasicChannelInfo,
} from 'submodules/common-ui/generated/api/gcs';

const uninitialisedFunction = () => new Error('Uninitialsed Function');

export const ChannelViewContext = createContext<ChannelViewContextValues>({
  articles: [],
  searchedArticles: [],
  channel: undefined,
  channelId: undefined,
  articlesLoading: true,
  channelLoading: true,
  setChannelId: uninitialisedFunction,
  setSearch: uninitialisedFunction,
  navigateToArticle: uninitialisedFunction,
});

interface ChannelViewContextValues {
  articles: BasicArticleInfo[] | undefined;
  searchedArticles: BasicArticleInfo[] | undefined;
  channel: BasicChannelInfo | undefined;
  channelId: number | undefined;
  articlesLoading: boolean;
  channelLoading: boolean;
  setChannelId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  navigateToArticle: (articleId: number) => void;
}

type ContextProps = {
  children: ReactNode;
};

const ChannelViewContextProvider = ({ children }: ContextProps) => {
  const [channelId, setChannelId] = useState<number>();
  const [searchedArticles, setSearchedArticles] = useState<BasicArticleInfo[]>(
    []
  );
  const [search, setSearch] = useState('');
  const history = useHistory();

  const { data: articles, isLoading: articlesLoading } = useGetArticlesQuery({
    filters: {
      status: 'published',
      channelId: String(channelId) || undefined,
    },
    page: 0,
    enabled: !!channelId,
    refetchOnWindowFocus: false,
  });

  const { data: searchedArticleItems } = useGetArticlesQuery({
    filters: {
      status: 'published',
      channelId: String(channelId) || undefined,
      title: search,
    },
    page: 0,
    enabled: search.length >= 3,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const { data: channel, isLoading: channelLoading } = useGetChannelQuery(
    Number(channelId),
    !!channelId
  );

  const navigateToArticle = useCallback(
    (articleId: number) => {
      history.push(routes.editorArticle.create(articleId.toString(), 'view'));
    },
    [history]
  );

  useEffect(() => {
    if (searchedArticles) {
      const searchedObj = (searchedArticleItems ?? []).map((e) => e.id);
      const currentObj = searchedArticles.map((e) => e.id);
      const equal = isEqual(searchedObj, currentObj);
      if (!equal) setSearchedArticles(searchedArticleItems ?? []);
    }
  }, [searchedArticleItems, searchedArticles]);

  const contextValue: ChannelViewContextValues = {
    articles,
    searchedArticles,
    channel,
    channelId,
    articlesLoading,
    channelLoading,
    setChannelId,
    setSearch,
    navigateToArticle,
  };

  return (
    <ChannelViewContext.Provider value={contextValue}>
      {children}
    </ChannelViewContext.Provider>
  );
};

const useChannelViewContext = () => {
  const context = useContext(ChannelViewContext);

  if (context === undefined) {
    throw new Error(
      'useChannelViewContext must be used within a ChannelViewContextProvider'
    );
  }

  return context;
};

export { ChannelViewContextProvider, useChannelViewContext };
export type { ChannelViewContextValues };
