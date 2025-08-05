import { setRequestInstance, setRequestToken } from 'app/api';
import { setRequestHeaders as setRequestArticleInstanceToken } from 'app/api/articles/request';
import { useSelector, useDispatch } from 'app/hooks';
import { selectors } from 'app/store/auth';
import { actions } from 'app/store/request';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

const RequestInstanceHandler = ({ children }: Props) => {
  const tenant = useSelector(selectors.getSelectedTenant);
  const token = useSelector(selectors.getToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tenant?.url) {
      setRequestInstance(tenant.url);
    }
  }, [tenant]);

  useEffect(() => {
    if (token) {
      setRequestToken(token);
      setRequestArticleInstanceToken({ token });
    }
  }, [token]);

  useEffect(() => {
    if (token && tenant) {
      dispatch(actions.requestInstanceUpdated(true));
    }
  }, [dispatch, tenant, token]);

  return <>{children}</>;
};

export default RequestInstanceHandler;
