import { ChatMessageType } from 'app/api/chat/constants';
import { useChatTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';

type EventType =
  | ChatMessageType.participantAdded
  | ChatMessageType.participantRemoved
  | ChatMessageType.topicUpdated;

interface ChatEventLabelProps {
  type: EventType;
  label: string;
  isDirect?: boolean;
}

type GetMessageByType = (props: {
  type: ChatMessageType;
  label: string;
  isDirect?: boolean;
  t: ReturnType<typeof useChatTranslation>['t'];
}) => string | null;

const getMessageByType: GetMessageByType = ({ type, label, isDirect, t }) => {
  switch (type) {
    case ChatMessageType.participantAdded:
      return t('{{name}} has been added to the chat', {
        name: label,
      });
    case ChatMessageType.participantRemoved:
      return t('{{name}} has been removed from the chat', { name: label });
    case ChatMessageType.topicUpdated:
      if (isDirect) {
        return t(
          'This is the very beginning of your conversation with {{name}}',
          {
            name: label,
          }
        );
      }

      return t('Topic has been updated to {{name}}', {
        name: label,
      });
    default:
      return null;
  }
};

const ChatEventLabel: FC<ChatEventLabelProps> = ({ type, label, isDirect }) => {
  const { t } = useChatTranslation();
  return (
    <div className="w-full text-center text-grayscale-secondary text-xs mb-1">
      {getMessageByType({ type, label, isDirect, t })}
    </div>
  );
};

export default ChatEventLabel;
