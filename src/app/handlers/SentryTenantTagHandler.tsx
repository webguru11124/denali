import { setTag } from '@sentry/react';
import { useSelector } from 'app/hooks';
import { selectors } from 'app/store/auth';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

const SentryTenantTagHandler = ({ children }: Props) => {
  const selectedTenant = useSelector(selectors.getSelectedTenant);

  useEffect(() => {
    if (selectedTenant) {
      setTag('tenant', selectedTenant.alias);
    }
  }, [selectedTenant]);

  return <>{children}</>;
};

export default SentryTenantTagHandler;
