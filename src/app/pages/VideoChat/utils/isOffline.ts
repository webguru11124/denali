import { CallEndReason } from '@azure/communication-calling';

const isOffline = (reason: CallEndReason): boolean =>
  (reason.code === 0 && reason.subCode === 5013) ||
  (reason.code === 480 && reason.subCode === 10037);

export default isOffline;
