import { useFeatures } from '@paralleldrive/react-feature-toggles';
import { setUser } from '@sentry/react';
import createOpenIdManager from 'app/api/createOpenIdManager';
import { useSelector, useDispatch } from 'app/hooks';
import { useBaseTranslation } from 'app/internationalization/hooks';
import { resetState as resetQueryState } from 'app/query/utils';
import { persistor, store } from 'app/store';
import { actions } from 'app/store/auth';
import { selectors } from 'app/store/request';
import { resetState as resetReduxState } from 'app/store/utils';
import { isActiveFeatureName, selectData, dayjs } from 'app/utils';
import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import { reset as resetChatRequest } from '../../chat/request';
import { setContentLanguage, reset } from '../../request';
import { COLLABORATOR_PERMISSIONS, MANAGER_ROLES, Role } from '../constants';
import queryKeys from '../queryKeys';
import getAuthenticatedUser from '../resources/getAuthenticatedUser';

type HasRoleArg = Role | string;

type HasRole = (roles: HasRoleArg | Array<HasRoleArg>) => boolean;

const useAuthenticatedUser = () => {
  const requestInstanceReady = useSelector(selectors.getRequestInstanceReady);
  const { i18n } = useBaseTranslation();
  const dispatch = useDispatch();

  const { data, refetch, isLoading, isError } = useQuery(
    queryKeys.authenticatedUser(),
    getAuthenticatedUser,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,

      onSuccess: (response) => {
        const responseData = selectData(response);
        if (!responseData) return undefined;

        // Configure request headers
        setContentLanguage(responseData.contentLanguage.current.code);

        // Set Translation Language
        dispatch(actions.translationLanguageChanged(responseData.translationLanguage?? 'en'));

        // Set user context for sentry
        setUser({
          id: String(responseData?.id),
          email: responseData?.email,
          username: responseData?.name,
        });

        return undefined;
      },
      enabled: requestInstanceReady,
    }
  );

  const user = useMemo(() => selectData(data), [data]);

  const history = useHistory();
  useEffect(() => {
    if (!user) return;
    const { uiLanguage } = user.contentLanguage;

    i18n.changeLanguage(uiLanguage);
    dayjs.locale(uiLanguage);
  }, [i18n, user]);

  const hasRole: HasRole = (roles) => {
    if (!user) return false;
    const userRole = user.profession.slug;
    if (Array.isArray(roles)) {
      return roles.includes(userRole);
    }

    return roles === userRole;
  };

  const isCollaborator = () =>
    user?.permissions?.modules?.articles?.some((permission) =>
      COLLABORATOR_PERMISSIONS.includes(permission)
    ) ?? false;

  const showAdvancedDashboard = () => user?.permissions?.modules?.advancedDashboard?.includes('read')?? false;

  const features = useFeatures();
  return {
    refetch,
    data: user,
    isLoading,
    hasRole,
    isManager: () => hasRole(MANAGER_ROLES),
    isCollaborator,
    showAdvancedDashboard,
    isError,
    logout: async () => {
      const idToken = store.getState().auth.idToken;
      await persistor.purge();
      resetReduxState();
      // Adding logout param, for not showing login form while we still need redirect to Identity server
      if (isActiveFeatureName('identityServer', features)) {
        history.push({
          pathname: '/',
          search: '?logout=1',
        });
      }
      await resetQueryState();
      // Reset request instance -> remove token, base URL from request cache
      reset();
      resetChatRequest();

      if (isActiveFeatureName('identityServer', features)) {
        await createOpenIdManager().signoutRedirect({
          id_token_hint: idToken,
        });
      }
    },
  };
};

export default useAuthenticatedUser;
