import { PageLoader } from 'app/components';
import config from 'app/config';
import { FC } from 'react';

const AtticusRedirect: FC = () => {
  const url = config.env.atticusUrl;
  window.location.href = url;
  return (
    <div className="h-screen">
      <PageLoader />
    </div>
  );
};

export default AtticusRedirect;
