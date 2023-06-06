import { Empty } from 'app/components';
import { useChatTranslation } from 'app/internationalization/hooks';
import chatImage from 'assets/images/chat.png';
import { FC } from 'react';

const NoConversationSelected: FC = () => {
  const { t } = useChatTranslation();

  const CONTENT = {
    image: <img src={chatImage} alt="no conversation selected" />,
    heading: t('All great ideas start with a conversation.'),
  };

  return <Empty content={CONTENT} />;
};

export default NoConversationSelected;
