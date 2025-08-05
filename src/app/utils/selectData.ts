import { types } from 'app/api';
import { AxiosResponse } from 'axios';

const selectData = <T>(data: AxiosResponse<types.Response<T>> | undefined) =>
  data?.data?.data;

export default selectData;
