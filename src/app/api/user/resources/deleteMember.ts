import { request } from '../../request';

const deleteMember = ({ id }: { id: number }) =>
  request().delete(`/api/v1/user-management/${id}`);
  
export default deleteMember;
