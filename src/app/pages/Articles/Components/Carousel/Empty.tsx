import { useArticlesTranslation } from 'app/internationalization/hooks';

const Empty = () => {
  const { t } = useArticlesTranslation();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center rounded-xl max-w-[328px] bg-white shadow-atobi px-4 py-4">
        <span className="text-sm text-center font-bold">
          {t('0 articles are awaiting your review')}
        </span>
        <span className="text-xs text-center mt-2">
          {t(
            'Use Atobi Connect to collaborate efficiently and securely with external teams and partners.'
          )}
        </span>
        <button
          className="bg-gradient-article1 rounded border border-transparent py-0.5 px-1 mt-3
      text-grayscale-primary bg-origin-border shadow-radius-gradient"
          onClick={() =>
            window.open(
              'https://help.atobi.io/article/133-atobi-connect',
              '_blank'
            )
          }
        >
          <span className="block text-xs">
            {t('See how Atobi Connect works')}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Empty;
