import { request } from '../../request';

const anonymizeMember = ({ id }: { id: number }) =>
  request().delete(`/api/v1/user-management/${id}/anonymize`);
  
export default anonymizeMember;
