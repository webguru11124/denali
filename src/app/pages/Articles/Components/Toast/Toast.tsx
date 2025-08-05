import { cx } from '@emotion/css';
import { useArticlesTranslation } from 'app/internationalization/hooks';

const Toast = ({ text, onClick }: { text: string; onClick: VoidFunction }) => {
  const { t } = useArticlesTranslation();
  return (
    <div
      className="flex justify-between items-center h-full rounded-lg pl-10 pr-5 border border-transparent 
bg-gradient-article3 shadow-radius-gradient bg-origin-border"
    >
      <span className="text-grayscale-primary "> {text}</span>

      <button
        className={cx(
          `flex justify-between items-center  rounded
    py-0.5 px-1 text-transparent `
        )}
        onClick={onClick}
      >
        <span
          className="flex justify-between items-center text-sm max-w-34 overflow-hidden text-ellipsis 
  whitespace-nowrap bg-gradient-text bg-clip-text"
        >
          {t('Cancel')}
        </span>
      </button>
    </div>
  );
};

export default Toast;
