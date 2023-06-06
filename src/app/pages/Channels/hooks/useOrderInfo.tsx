import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import OrderInfo from '../components/OrderInfo';
import { useChannelsContext } from '../context';

const useOrderInfo = () => {
  const { hasChanges, movedBlock } = useChannelsContext();

  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const isHidden = !(movedBlock && hasChanges);
    setHidden(isHidden);
  }, [hasChanges, movedBlock]);

  useEffect(() => {
    if (!hidden) {
      toast(<OrderInfo />, {
        position: 'bottom-center',
        autoClose: false,
        closeButton: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        containerId: 'ChannelActions',
      });
    }
  }, [hidden]);
};

export default useOrderInfo;
