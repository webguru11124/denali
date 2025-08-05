import { FC } from 'react';

import Spinner from '../Spinner';

const PageLoader: FC = () => (
  <div className="flex items-center justify-center w-full h-full">
    <Spinner />
  </div>
);

export default PageLoader;
