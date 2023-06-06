import { useChatTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';
import DeleteIcon from 'remixicon-react/DeleteBin5LineIcon';

interface SettingsProps {
  onShouldDisplayDeleteFlow: () => void;
}

const Settings: FC<SettingsProps> = ({ onShouldDisplayDeleteFlow }) => {
  const { t } = useChatTranslation();

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={onShouldDisplayDeleteFlow}
        className="flex items-center mb-3"
      >
        <span className="flex items-center w-12 h-12 justify-center bg-error-light rounded p-4">
          <DeleteIcon className="min-w-6 w-6 h-6 text-error" />
        </span>
        <p className="text-error ml-2 text-sm font-bold">{t('Delete Group')}</p>
      </button>
    </div>
  );
};

export default Settings;
