import { useAuthenticatedUser } from 'app/api/auth/hooks';

import { initialComplaints } from '../constants';

const useComplaints = () => {
  const { data } = useAuthenticatedUser();
  return data?.complaints ?? initialComplaints;
};

export default useComplaints;
