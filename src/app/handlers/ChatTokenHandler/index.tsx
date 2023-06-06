import { setRequestHeaders } from 'app/api/chat';
import { useChatTokenQuery } from 'app/api/chat/hooks';
import { PageLoader } from 'app/components';
import { useSelector, useDispatch } from 'app/hooks';
import { selectors as authSelectors } from 'app/store/auth';
import { selectors as chatSelectors, actions } from 'app/store/chat';
import { ChatToken, ChatTokenExpiresOn } from 'app/store/chat/types';
import { selectors as requestSelectors } from 'app/store/request';
import { dayjs } from 'app/utils';
import { useEffect, useState, useCallback, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const getExpiresInTime = (expiresOn: string) => dayjs(expiresOn).diff(dayjs());

const isTokenValid = (token: ChatToken, expiresOn: ChatTokenExpiresOn) => {
  if (!token || !expiresOn) return false;

  return getExpiresInTime(expiresOn) > 0;
};

const ChatRequestHandler = ({ children }: Props) => {
  const [isTokenAttachedToHeaders, setIsTokenAttachedToHeaders] =
    useState(false);
  const authToken = useSelector(authSelectors.getToken);
  const isAuthRequestReady = useSelector(
    requestSelectors.getRequestInstanceReady
  );
  const dispatch = useDispatch();
  const cachedChatToken = useSelector(chatSelectors.getChatToken);
  const cachedChatTokenExpiration = useSelector(
    chatSelectors.getChatTokenExpiresOn
  );

  const { data: chatToken, isError } = useChatTokenQuery(
    // We only want to fetch new tokens if there are no tokens cached
    !cachedChatToken &&
      !cachedChatTokenExpiration &&
      isAuthRequestReady &&
      isTokenAttachedToHeaders
  );

  const expireToken = useCallback(() => {
    dispatch(actions.chatTokenExpired());
    setIsTokenAttachedToHeaders(false);
  }, [dispatch]);

  useEffect(() => {
    if (!authToken) setIsTokenAttachedToHeaders(false);
  }, [authToken]);

  useEffect(() => {
    if (!cachedChatTokenExpiration) return;

    // Upon mounting we want to remove expired chat token
    if (getExpiresInTime(cachedChatTokenExpiration) <= 0) {
      expireToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chatToken || (cachedChatToken && cachedChatTokenExpiration)) return;

    dispatch(actions.chatTokenRetrieved(chatToken.token));
    dispatch(actions.chatTokenExpiresOnRetrieved(chatToken.expiresOn));
  }, [cachedChatToken, cachedChatTokenExpiration, chatToken, dispatch]);

  useEffect(() => {
    if (!cachedChatToken || !cachedChatTokenExpiration) return undefined;

    // Delete cached token once it expires
    const timeout = setTimeout(() => {
      expireToken();
    }, getExpiresInTime(cachedChatTokenExpiration));

    // We want to clear timeout just in case, so that duplicate actions are not passed
    return () => {
      clearTimeout(timeout);
    };
  }, [cachedChatToken, cachedChatTokenExpiration, expireToken]);

  useEffect(() => {
    if (isTokenAttachedToHeaders || !authToken || !authToken) return undefined;
    setRequestHeaders({
      token: authToken,
    });

    setIsTokenAttachedToHeaders(true);

    return undefined;
  }, [isTokenAttachedToHeaders, authToken]);

  useEffect(() => {
    if (authToken && isTokenValid(cachedChatToken, cachedChatTokenExpiration)) {
      setRequestHeaders({
        token: authToken,
        chatToken: cachedChatToken,
      });
    }
  }, [cachedChatToken, cachedChatTokenExpiration, chatToken, authToken]);

  if (
    authToken &&
    !isTokenValid(cachedChatToken, cachedChatTokenExpiration) &&
    !isError
  ) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

export default ChatRequestHandler;
