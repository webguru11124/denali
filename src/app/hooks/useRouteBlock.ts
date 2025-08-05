import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

interface Location {
  pathname: string;
  hash: string;
  search: string;
  state: unknown;
}

interface Action {
  action: 'POP' | 'PUSH' | 'REPLACE';
}

interface Props {
  onBlock: (location: Location, action: Action) => boolean;
}

const useRouteBlock = ({ onBlock }: Props) => {
  const history = useHistory();
  const routeBlocker = useRef<VoidFunction>();

  useEffect(() => {
    routeBlocker.current = history.block(onBlock);

    return () => {
      routeBlocker.current && routeBlocker.current();
    };
  });

  return {
    unblock: () => routeBlocker.current?.(),
  };
};

export type { Action, Location };
export { useRouteBlock };
export default useRouteBlock;
