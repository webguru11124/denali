import { ZodIssueOptionalMessage } from 'zod';

interface ErrorMessages {
  [key: string]: {
    [key: string]: string;
  };
}

const createErrorMap =
  (messages: ErrorMessages) => (error: ZodIssueOptionalMessage) => ({
    message: messages?.[error.path?.[0]]?.[error.code] || 'Invalid value',
  });

export default createErrorMap;
