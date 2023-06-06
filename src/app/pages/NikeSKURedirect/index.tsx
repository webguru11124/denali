import { PageLoader, GenericError } from 'app/components';
import config from 'app/config';
import { decryptAES } from 'app/utils';
import { FC, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useRedirectKey, useUserQuery } from './hooks';

const NikeSKURedirect: FC = () => {
  const { redirectKey, tenant } = useParams<{
    redirectKey?: string;
    tenant?: string;
  }>();
  const formRef = useRef<HTMLFormElement>(null);

  const { data, isError: isKeyError } = useRedirectKey({
    enabled: !redirectKey,
  });

  const { data: userData, isError: isUserError } = useUserQuery({
    redirectKey: redirectKey || data?.redirectKey,
    tenant,
  });

  useEffect(() => {
    if (userData && formRef.current) {
      formRef.current.submit();
    }
  }, [userData]);

  if (isKeyError || isUserError) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <GenericError />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  const decryptedLogin = decryptAES(
    config.env.nikeSkuEncryptionKey,
    userData.login
  );
  const decryptedPassword = decryptAES(
    config.env.nikeSkuEncryptionKey,
    userData.password
  );

  if (!decryptedLogin || !decryptedPassword) {
    return <GenericError />;
  }

  return (
    <div className="w-screen h-screen">
      <PageLoader />
      <div>
        <form ref={formRef} method="post" action={config.env.nikeSKUUri}>
          <input type="hidden" value={decryptedLogin} name="login" />
          <input type="hidden" value={decryptedPassword} name="password" />
          <input type="submit" name="sub" value="Nike SKU Sign In" />
        </form>
      </div>
    </div>
  );
};

export default NikeSKURedirect;
