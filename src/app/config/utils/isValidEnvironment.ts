import { AppEnvironment } from '../types';

const isValidEnvironment = (env: string): env is AppEnvironment =>
  ['test', 'staging', 'prod', 'dev'].includes(env);

export default isValidEnvironment;
