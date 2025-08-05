import { Input } from 'app/components';
import { useChatTranslation } from 'app/internationalization/hooks';
import { FC, useState, ChangeEvent } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import EditIcon from 'remixicon-react/Edit2LineIcon';
import SearchIcon from 'remixicon-react/SearchLineIcon';

import CreateDirectConversationModal from './CreateDirectConversationModal';
import CreateGroupModal from './CreateGroupModal';
import NewConversationPopup from './NewConversationPopup';

interface HeaderProps {
  filterValue: string;
  onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Header: FC<HeaderProps> = ({ filterValue, onFilterChange }) => {
  const [showConversationPopup, setShowConversationPopup] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showDirectConversationModal, setShowDirectConversationModal] =
    useState(false);
  const { t } = useChatTranslation();
  return (
    <div className="flex mb-2 mt-4">
      {showCreateGroupModal && (
        <CreateGroupModal onClose={() => setShowCreateGroupModal(false)} />
      )}
      {showDirectConversationModal && (
        <CreateDirectConversationModal
          onClose={() => setShowDirectConversationModal(false)}
        />
      )}
      <Input
        name="query"
        icon={<SearchIcon className="text-grayscale-secondary" />}
        className="flex-1"
        value={filterValue}
        onChange={onFilterChange}
        placeholder={`${t('Search groups & chats')}`}
      />
      <div className="relative">
        <OutsideClickHandler
          onOutsideClick={() => setShowConversationPopup(false)}
        >
          <button
            type="button"
            onClick={() => setShowConversationPopup((prev) => !prev)}
            className="p-3 bg-grayscale-bg-dark hover:bg-focus-background mx-2 rounded-lg"
          >
            <EditIcon className="text-focus m-0.5" />
          </button>
          {showConversationPopup && (
            <NewConversationPopup
              onDirectChatModalOpen={() => setShowDirectConversationModal(true)}
              onGroupModalOpen={() => setShowCreateGroupModal(true)}
            />
          )}
        </OutsideClickHandler>
      </div>
    </div>
  );
};

export default Header;
