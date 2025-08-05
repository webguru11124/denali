import { useParams } from 'react-router-dom';

const useRouteId = (paramName = 'id') => {
  const id = useParams<{ [key: string]: string | undefined }>()?.[paramName];

  const numericId = Number(id);

  return !Number.isNaN(numericId) ? numericId : 'ID should be numeric';
};

export default useRouteId;
