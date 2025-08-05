import { useNotFoundTranslation } from 'app/internationalization/hooks';
import notFound from 'assets/images/not-found.svg';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const PageNotFound: FC = () => {
  const { t } = useNotFoundTranslation();
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col justify-center items-center h-full">
        <img className="w-[170px]" src={notFound} alt="" />
        <h1 className="text-lg font-bold text-grayscale-primary mt-5">
          {t('We can’t find the page you’re looking for')}
        </h1>
        <div className="text-center py-3 text-lg text-grayscale-secondary">
          <p>
            {t('Someone have deleted it, changed its name, or it’s temporarily unavailable.')}
          </p>
          <p className='mt-1'>
            {t('Check your spelling in the address bar. Or, try opening this site’s home page to search or browse for the content.')}
          </p>
          <div className='mt-5'>
            <Link to="/" className='underline text-focus'>
              {t('Go To Home Page')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageNotFound;