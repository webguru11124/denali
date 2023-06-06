import tryParseJson from '../../../utils/parsers/parseJson';
import { request } from '../../request';
import { SingleMissionResponse } from '../types';
import { mapMission } from '../utils';

const getMission = (id: number) =>
  request().get<SingleMissionResponse>(`/api/v1/missions/${id}`, {
    transformResponse: (response) => {
      const parsedResponse = tryParseJson<any>(response);
      if (parsedResponse.success && parsedResponse.data)
        return mapMission(parsedResponse.data);
    },
  });

export default getMission;
