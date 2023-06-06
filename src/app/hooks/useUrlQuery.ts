import { useLocation } from 'react-router-dom';

type UseUrlQueryType = (queryName: string) => string;

const useUrlQuery: UseUrlQueryType = (queryName) => {
  const location = useLocation();

  return new URLSearchParams(location.search).get(queryName) || '';
};

export default useUrlQuery;
