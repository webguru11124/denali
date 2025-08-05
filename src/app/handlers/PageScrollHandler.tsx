import { useSelector } from 'app/hooks';
import { selectors } from 'app/store/modal';
import { useEffect, ReactNode, useRef, FC } from 'react';

interface PageScrollHandlerProps {
  children: ReactNode | null;
}

const PageScrollHandler: FC<PageScrollHandlerProps> = ({ children }) => {
  const openedModalAmount = useSelector(selectors.getModalsOpened);
  const scrollHeight = useRef<number | null>(null);

  useEffect(() => {
    if (openedModalAmount && !scrollHeight.current) {
      scrollHeight.current = document.body.getBoundingClientRect().top * -1;

      const handler = () => {
        window.scrollTo({ top: scrollHeight.current || 0 });
      };

      window.addEventListener('scroll', handler);

      return () => {
        window.removeEventListener('scroll', handler);
        scrollHeight.current = null;
      };
    }

    return undefined;
  }, [openedModalAmount]);

  return <>{children}</>;
};

export default PageScrollHandler;
