import { useArticlesTranslation } from 'app/internationalization/hooks';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';

const ModalHeader = ({ close }: { close: VoidFunction }) => {
  const { t } = useArticlesTranslation();
  return (
    <div className="relative">
      <label
        className="block font-bold text-grayscale-primary"
        htmlFor="collaborator"
      >
        {t('Add Collaborators')}
      </label>
      <span className="text-xs text-grayscale-secondary">
        {t(
          'Add collaborators to help you with editing, translating, and publishing.'
        )}
      </span>
      <button
        className="h-10 w-10 flex justify-center items-center rounded bg-white shadow-atobi text-grayscale-secondary absolute right-0 top-0"
        onClick={close}
      >
        <CloseLineIcon />
      </button>
    </div>
  );
};

export default ModalHeader;
