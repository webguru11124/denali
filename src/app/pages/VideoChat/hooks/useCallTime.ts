import { useContext, useEffect, useState } from 'react';

import CallContext from '../contexts/call';
import formatVideoCallTime from '../utils/formatVideoCallTime';

const useCallTime = () => {
  const { callStartTimestamp } = useContext(CallContext);

  const [time, setTime] = useState<string>('00:00:00');

  const getTime = () => {
    if (!callStartTimestamp) return '00:00:00';
    return formatVideoCallTime(callStartTimestamp);
  };

  useEffect(() => {
    const timer = setTimeout(() => setTime(getTime()), 1000);
    return () => clearTimeout(timer);
  });

  return { time };
};

export default useCallTime;
