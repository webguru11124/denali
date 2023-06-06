import queryClient from '../index';

const resetState = async () => {
  await queryClient.cancelQueries();
  queryClient.removeQueries();
};

export default resetState;
