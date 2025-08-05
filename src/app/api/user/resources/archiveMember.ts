import { request } from '../../request';

const archiveMember = ({ id }: { id: number }) =>
  request().delete(`/api/v1/user-management/${id}/archive`);
  
export default archiveMember;
