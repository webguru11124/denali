import { LogLevel } from 'app/utils/types';

import { LogLevelKeys } from '../types';

const isLogLevelKey = (level: string): level is LogLevelKeys =>
  Object.keys(LogLevel).includes(String(level));

export default isLogLevelKey;
