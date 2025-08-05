import moment from 'moment';

const formatVideoCallTime = (timestamp: number) =>
  moment.utc(moment(Date.now()).diff(moment(timestamp))).format('HH:mm:ss');

export default formatVideoCallTime;
