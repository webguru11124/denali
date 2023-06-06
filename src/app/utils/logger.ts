import { captureException, captureMessage } from '@sentry/react';
import config from 'app/config';
import log from 'loglevel';

const originalFactory = log.methodFactory;

log.methodFactory = (methodName, logLevel, loggerName) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);
  return (...args: Array<any>) => {
    const clonedArgs = [...args];
    const sentryReporter =
      methodName === 'error' ? captureException : captureMessage;
    const firstArg = clonedArgs.shift();

    sentryReporter(firstArg, {
      contexts: {
        meta: Object.entries(clonedArgs).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value,
          }),
          {}
        ),
      },
    });
    rawMethod(...args);
  };
};

log.setLevel(config.env.logLevel);

export default log;
