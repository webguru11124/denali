import { cx } from '@emotion/css';
import { useArticlesTranslation } from 'app/internationalization/hooks';

const UndoToast = ({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon?: JSX.Element;
  onClick: VoidFunction;
}) => {
  const { t } = useArticlesTranslation();
  return (
    <div
      className="flex justify-between items-center h-full rounded-lg pl-10 pr-5 border border-transparent 
bg-gradient-article3 shadow-radius-gradient bg-origin-border"
    >
      <div className="flex items-center jus">
        {icon && icon} &nbsp;
        <span className="text-grayscale-primary "> {text}</span>
      </div>

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
          {t('Undo')}
        </span>
      </button>
    </div>
  );
};

export default UndoToast;
