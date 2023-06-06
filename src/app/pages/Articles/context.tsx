import useArticles from 'app/api/articles/hooks/useArticles';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { UserProfile } from 'app/api/auth/types';
import useGetChannelsQuery from 'app/api/channels/hooks/useChannelsQuery';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query/types/core/types';
import {
  ArticlePage,
  ActionAnswerPageMeta,
  BasicArticleInfo,
  BasicArticleInfoStatusEnum,
  BasicChannelInfo,
} from 'submodules/common-ui/generated/api/gcs';

type RefetchArticleList =
  | undefined
  | (<TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<ArticlePage, unknown>>);

type ArchiveModalState = { open: boolean; ids: Array<number> };
type DeleteModalState = { open: boolean; ids: Array<number> };

const uninitialisedFunction = () => new Error('Uninitialsed Function');

export const ArticlesContext = createContext<ArticlesContextValues>({
  articleFilters: {
    status: 'draft',
  },
  articles: undefined,
  articlesMeta: undefined,
  page: 0,
  isLoading: false,
  user: undefined,
  selectedArticles: [],
  selectedChannels: [],
  channels: [],
  refetch: undefined,
  archiveModalState: { open: false, ids: [] },
  deleteModalState: { open: false, ids: [] },
  changePage: uninitialisedFunction,
  setArticleFilters: uninitialisedFunction,
  setSelectedArticles: uninitialisedFunction,
  setArchiveModalState: uninitialisedFunction,
  setDeleteModalState: uninitialisedFunction,
  setSelectedChannels: uninitialisedFunction,
});

type SortValues = 'asc' | 'desc';
interface ArticleFilter {
  title?: string;
  status?: BasicArticleInfoStatusEnum;
  createdBy?: number;
  archivedAt?: SortValues;
  createdAt?: SortValues;
  publishedAt?: SortValues;
  channelId?: string;
  live?: '1';
  unseen?: '1';
  timezone?: string;
}

interface ArticlesContextValues {
  articleFilters: ArticleFilter;
  articles: BasicArticleInfo[] | undefined;
  articlesMeta: ActionAnswerPageMeta | undefined;
  page: number;
  isLoading: boolean;
  selectedChannels: BasicChannelInfo[];
  channels: BasicChannelInfo[];
  changePage: React.Dispatch<React.SetStateAction<number>>;
  setArticleFilters: React.Dispatch<React.SetStateAction<ArticleFilter>>;
  user: UserProfile | undefined;
  selectedArticles: Array<number>;
  setSelectedArticles: React.Dispatch<React.SetStateAction<Array<number>>>;
  refetch: RefetchArticleList;
  archiveModalState: ArchiveModalState;
  setArchiveModalState: React.Dispatch<React.SetStateAction<ArchiveModalState>>;
  deleteModalState: DeleteModalState;
  setDeleteModalState: React.Dispatch<React.SetStateAction<DeleteModalState>>;
  setSelectedChannels: React.Dispatch<React.SetStateAction<BasicChannelInfo[]>>;
}

type ContextProps = {
  children: ReactNode;
};

const ArticlesContextProvider = ({ children }: ContextProps) => {
  const initalFilterState: ArticleFilter = {
    status: 'draft',
  };

  const [articleFilters, setArticleFilters] =
    useState<ArticleFilter>(initalFilterState);

  const [page, setPage] = useState(0);
  const [selectedArticles, setSelectedArticles] = useState<Array<number>>([]);
  const [archiveModalState, setArchiveModalState] = useState<ArchiveModalState>(
    {
      open: false,
      ids: [],
    }
  );
  const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
    open: false,
    ids: [],
  });

  const { data: dataChannels } = useGetChannelsQuery({
    ranking: 'desc',
    refetchOnMount: true,
  });
  const channels =
    dataChannels?.pages?.map((channelsPage) => channelsPage.data.data).flat() ??
    [];

  const [selectedChannels, setSelectedChannels] = useState<BasicChannelInfo[]>(
    []
  );

  const {
    data: articles,
    meta: articlesMeta,
    isLoading,
    refetch,
  } = useArticles({
    page,
    filters: articleFilters,
    refetchOnWindowFocus: true,
  });
  const { data: user } = useAuthenticatedUser();

  const contextValue: ArticlesContextValues = {
    articleFilters,
    page,
    articles,
    isLoading,
    articlesMeta,
    selectedChannels,
    channels,
    setArticleFilters,
    changePage: setPage,
    user,
    selectedArticles,
    setSelectedArticles,
    refetch,
    archiveModalState,
    setArchiveModalState,
    deleteModalState,
    setDeleteModalState,
    setSelectedChannels,
  };

  return (
    <ArticlesContext.Provider value={contextValue}>
      {children}
    </ArticlesContext.Provider>
  );
};

const useArticlesContext = () => {
  const context = useContext(ArticlesContext);

  if (context === undefined) {
    throw new Error(
      'useArticlesContext must be used within a ArticlesContextProvider'
    );
  }

  return context;
};

export { ArticlesContextProvider, useArticlesContext };
export type { ArticlesContextValues, ArticleFilter, SortValues };
