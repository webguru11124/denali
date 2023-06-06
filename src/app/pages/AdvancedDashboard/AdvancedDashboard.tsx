import useGetWebAccessToken from 'app/api/sisenseDashboard/hooks/useGetWebAccessToken';
import { PageLoader } from 'app/components';
import { useAdvancedDashboardTranslation } from 'app/internationalization/hooks';
import { useParams } from 'react-router-dom';

import useWebAccessTokenMutation from './hooks/useWebAccessTokenMutation';
import SisenseDashboard from './SisenseDashboard';

const AdvancedDashboard = () => {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const { t } = useAdvancedDashboardTranslation();
  const { isLoading, wat } = useGetWebAccessToken();


  if (isLoading || !wat?.token) return <PageLoader />;

  if (!wat?.token) return <div className='mt-2'>
    {t('Failed to get Web access Token, Please try to refresh the page.')}
  </div>;

  return (
    <SisenseDashboard token={wat.token} dashboardId={dashboardId} />
  );
};

export default AdvancedDashboard;
