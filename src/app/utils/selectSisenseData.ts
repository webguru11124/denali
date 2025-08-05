import { types } from 'app/api';

const selectSisenseData = <T>(data: types.Response<T> | undefined) =>
  data?.data;

export default selectSisenseData;
