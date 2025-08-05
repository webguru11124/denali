import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type DeleteModalState = {
  open: boolean;
  id?: number | undefined;
  members?: number | undefined;
};

const uninitialisedFunction = () => new Error('Uninitialsed Function');

export const AudiencesContext = createContext<AudiencesContextValues>({
  audienceTabFilter: 'available',
  page: 1,
  selectedAudiences: [],
  deleteModalState: { open: false },
  setDeleteModalState: uninitialisedFunction,
  setSelectedAudiences: uninitialisedFunction,
  changePage: uninitialisedFunction,
  setAudienceTabFilter: uninitialisedFunction,
});

type AudienceTabFilter = 'available';

interface AudiencesContextValues {
  audienceTabFilter: AudienceTabFilter;
  page: number;
  selectedAudiences: Array<number>;
  deleteModalState: DeleteModalState;
  setDeleteModalState: React.Dispatch<React.SetStateAction<DeleteModalState>>;
  setSelectedAudiences: Dispatch<SetStateAction<number[]>>;
  changePage: Dispatch<SetStateAction<number>>;
  setAudienceTabFilter: Dispatch<SetStateAction<AudienceTabFilter>>;
}

type ContextProps = {
  children: ReactNode;
};

const AudiencesContextProvider = ({ children }: ContextProps) => {
  const [audienceTabFilter, setAudienceTabFilter] =
    useState<AudienceTabFilter>('available');
  const [page, setPage] = useState(1);
  const [selectedAudiences, setSelectedAudiences] = useState<Array<number>>([]);
  const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
    open: false,
  });

  const contextValue: AudiencesContextValues = {
    page,
    audienceTabFilter,
    selectedAudiences,
    deleteModalState,
    setDeleteModalState,
    setSelectedAudiences,
    setAudienceTabFilter,
    changePage: setPage,
  };

  return (
    <AudiencesContext.Provider value={contextValue}>
      {children}
    </AudiencesContext.Provider>
  );
};

const useAudiencesContext = () => {
  const context = useContext(AudiencesContext);

  if (context === undefined) {
    throw new Error(
      'useAudiencesContext must be used within a AudiencesContextProvider'
    );
  }

  return context;
};

export { AudiencesContextProvider, useAudiencesContext };
export type { AudiencesContextValues, AudienceTabFilter, DeleteModalState };
