import { request } from '../../request';

const deleteAudience = (id: number) =>
  request().delete(`/api/v1/audiences/${id}`);

export { deleteAudience };
export default deleteAudience;
