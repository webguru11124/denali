import { cx } from '@emotion/css';
import { useChatTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';
import { RemixiconReactIconComponentType } from 'remixicon-react';
import GroupChatIcon from 'remixicon-react/TeamLineIcon';
import DirectChatIcon from 'remixicon-react/UserLineIcon';

interface ButtonProps {
  icon: RemixiconReactIconComponentType;
  label: string;
  className?: string;
  onClick: () => void;
}

interface NewConversationPopupProps {
  onGroupModalOpen: VoidFunction;
  onDirectChatModalOpen: VoidFunction;
}

const Button: FC<ButtonProps> = ({ icon: Icon, label, className, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={cx(
      'flex items-center pl-4 pr-21 py-3 hover:bg-focus-background w-full',
      className
    )}
  >
    <Icon className="mr-4" />
    <span className="text-sm whitespace-nowrap">{label}</span>
  </button>
);

const NewConversationPopup: FC<NewConversationPopupProps> = ({
  onGroupModalOpen,
  onDirectChatModalOpen,
}) => {
  const { t } = useChatTranslation();

  return (
    <div className="absolute z-30 rounded-lg bg-white right-1/2 transform translate-x-1/2 shadow-atobi">
      <div>
        <Button
          onClick={onGroupModalOpen}
          icon={GroupChatIcon}
          className="rounded-t-lg"
          label={t('New Group')}
        />
        <Button
          onClick={onDirectChatModalOpen}
          icon={DirectChatIcon}
          className="rounded-b-lg"
          label={t('New Direct Chat')}
        />
      </div>
    </div>
  );
};

export default NewConversationPopup;
