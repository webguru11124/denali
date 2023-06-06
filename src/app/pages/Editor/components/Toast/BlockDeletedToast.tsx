import { useArticlesTranslation } from 'app/internationalization/hooks';
import a11yKeydown from 'app/utils/a11y/keydown';

interface ToastProps {
  onClick: () => void;
  type: string;
}

const BlockDeletedToast = ({ type, onClick }: ToastProps) => {
  const { t } = useArticlesTranslation();
  return (
    <div
      className="flex justify-between items-center h-full rounded-lg pl-10 pr-5 border border-transparent 
    bg-gradient-article3 shadow-radius-gradient bg-origin-border"
    >
      <span className="text-grayscale-primary font-lato">
        {t('{{type}} block was deleted', {
          type: type,
        })}
      </span>
      <a
        role="button"
        tabIndex={0}
        className="flex justify-between items-center py-0.5 px-1 text-transparent shadow-radius-gradient"
        onClick={onClick}
        onKeyDown={(e) => a11yKeydown(e, onClick)}
      >
        <span
          className="flex justify-between items-center max-w-34 overflow-hidden text-ellipsis 
        whitespace-nowrap bg-gradient-text bg-clip-text font-lato font-bold"
        >
          {t('Cancel')}
        </span>
      </a>
    </div>
  );
};

export default BlockDeletedToast;
