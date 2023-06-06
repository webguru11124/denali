import { request } from '../../request';
import { MissionTagResponse } from '../types';

const getTags = () => request().get<MissionTagResponse>('/api/v1/tags');

export default getTags;
