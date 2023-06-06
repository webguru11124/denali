import { PaginatedResponseMeta } from 'app/api/types';
import useGetMembersQuery from 'app/api/user/hooks/useMembers';
import {
  UserStatus,
  SortByColumn,
  UserMember,
  MembersResponse,
  GetMemberListRequest,
} from 'app/api/user/types';
import { AxiosResponse } from 'axios';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query/types/core/types';

type ContextProps = {
  children: ReactNode;
};

type DeleteModalState = { open: boolean; ids: Array<number> };

type RefetchArticleList =
  | undefined
  | (<TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<
      QueryObserverResult<AxiosResponse<MembersResponse, any>, unknown>
    >);

interface MembersContextValues {
  memberFilter: GetMemberListRequest;
  members: UserMember[] | undefined;
  membersMeta: PaginatedResponseMeta | undefined;
  isFetching: boolean;
  refetch: RefetchArticleList;
  setMemberFiler: React.Dispatch<React.SetStateAction<GetMemberListRequest>>;
  deleteModalState: DeleteModalState;
  setDeleteModalState: React.Dispatch<React.SetStateAction<DeleteModalState>>;
  archiveModalState: DeleteModalState;
  setArchiveModalState: React.Dispatch<React.SetStateAction<DeleteModalState>>;
  anonymizeModalState: DeleteModalState;
  setAnonymizeModalState: React.Dispatch<
    React.SetStateAction<DeleteModalState>
  >;
}

const uninitialisedFunction = () => new Error('Uninitialsed Function');

const initalParamState: GetMemberListRequest = {
  status: UserStatus.active,
  sortedByColumn: SortByColumn.name,
  order: 'asc',
  page: 1,
};

export const MembersContext = createContext<MembersContextValues>({
  memberFilter: initalParamState,
  members: undefined,
  membersMeta: undefined,
  isFetching: false,
  refetch: undefined,
  deleteModalState: { open: false, ids: [] },
  archiveModalState: { open: false, ids: [] },
  anonymizeModalState: { open: false, ids: [] },
  setMemberFiler: uninitialisedFunction,
  setDeleteModalState: uninitialisedFunction,
  setArchiveModalState: uninitialisedFunction,
  setAnonymizeModalState: uninitialisedFunction,
});

const MembersContextProvider = ({ children }: ContextProps) => {
  const [memberFilter, setMemberFiler] =
    useState<GetMemberListRequest>(initalParamState);

  const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
    open: false,
    ids: [],
  });

  const [archiveModalState, setArchiveModalState] = useState<DeleteModalState>({
    open: false,
    ids: [],
  });

  const [anonymizeModalState, setAnonymizeModalState] =
    useState<DeleteModalState>({
      open: false,
      ids: [],
    });

  const {
    data: members,
    meta: membersMeta,
    isFetching,
    refetch,
  } = useGetMembersQuery(memberFilter);

  const contextValue: MembersContextValues = {
    memberFilter,
    membersMeta,
    setMemberFiler,
    members,
    isFetching,
    deleteModalState,
    setDeleteModalState,
    archiveModalState,
    setArchiveModalState,
    anonymizeModalState,
    setAnonymizeModalState,
    refetch,
  };

  return (
    <MembersContext.Provider value={contextValue}>
      {children}
    </MembersContext.Provider>
  );
};

const useMembersContext = () => {
  const context = useContext(MembersContext);

  if (context === undefined) {
    throw new Error(
      'useMembersContext must be used within a MembersContextProvider'
    );
  }

  return context;
};

export { MembersContextProvider, useMembersContext };
export type { MembersContextValues };
