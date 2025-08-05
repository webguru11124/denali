import { request } from '../../request';

const completeGenericActivity = (id: number) =>
  request().post(`/api/v1/activities/${id}/answers`);

export default completeGenericActivity;
