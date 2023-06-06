import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryKeys } from 'app/api/chat';
import { Message } from 'app/api/chat/types';
import { Input, FilePicker } from 'app/components';
import {
  postChatMessageSchema,
  imagesSchema,
  videosSchema,
} from 'app/form/validation';
import { useChatTranslation } from 'app/internationalization/hooks';
import { createFileWithMetadata, isDefined } from 'app/utils';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import AttachmentIcon from 'remixicon-react/Attachment2Icon';
import ImageIcon from 'remixicon-react/Image2LineIcon';
import SendIcon from 'remixicon-react/SendPlane2FillIcon';
import VideoIcon from 'remixicon-react/VideoLineIcon';

import { AttachedFilesList } from '../components';
import { usePostMessageMutation } from '../hooks';
import { ThreadMessagesCache, FileWithMetadata } from '../types';
import { getMaxMessageId } from '../utils';

const InputContainer = styled.div`
  .input_container {
    background-color: white !important;
  }
  input {
    background-color: white !important;
    box-shadow: none !important;
  }
`;

interface MessageFormProps {
  threadId: string;
  title: string;
  onOptimisticSuccess?: () => void;
  reply?: Omit<Message, 'reply'>;
}

const DEFAULT_VALUES = {
  text: '',
  files: {
    addedIds: [],
  },
};

const MessageForm: FC<MessageFormProps> = ({
  threadId,
  title,
  onOptimisticSuccess,
  reply,
}) => {
  const { mutate } = usePostMessageMutation({
    threadId,
    onMutate: onOptimisticSuccess,
  });
  const [attachedFiles, setAttachedFiles] = useState<Array<FileWithMetadata>>(
    []
  );
  const { t } = useChatTranslation();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, watch } = useForm({
    resolver: zodResolver(postChatMessageSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const textValue = watch('text');

  const areFilesUploading = Boolean(
    attachedFiles.find(({ isUploaded }) => !isUploaded)
  );

  const canSubmitForm =
    !areFilesUploading && (textValue.trim().length || attachedFiles.length);

  return (
    <form
      onSubmit={handleSubmit(({ text }) => {
        if (!canSubmitForm) return;
        const threadMessagesCache = queryClient.getQueryData<
          ThreadMessagesCache | undefined
        >(queryKeys.getMessages(threadId));

        const getClientId = () => {
          if (!threadMessagesCache) return Date.now().toString();

          const latestId = getMaxMessageId(threadMessagesCache);

          return String(Number(latestId || Date.now()) + 1);
        };

        mutate({
          reply,
          text: text.trim(),
          clientId: getClientId(),
          files: {
            addedIds: attachedFiles
              .filter(({ uploadedId }) => isDefined(uploadedId))
              .map(({ uploadedId }) => String(uploadedId)),
          },
        });
        setAttachedFiles([]);
        reset();
      })}
    >
      {Boolean(attachedFiles.length) && (
        <div className="px-3">
          <AttachedFilesList
            onRemove={(fileToRemoveId) => {
              setAttachedFiles((prev) =>
                prev.filter(({ id }) => id !== fileToRemoveId)
              );
            }}
            onFileUploaded={(localId: string, uploadedId) => {
              setAttachedFiles((prev) =>
                prev.map(({ id, ...rest }) => {
                  if (localId !== id) {
                    return {
                      id,
                      ...rest,
                    };
                  }

                  return {
                    id,
                    ...rest,
                    uploadedId,
                    isUploaded: true,
                  };
                })
              );
            }}
            files={attachedFiles}
          />
        </div>
      )}
      <div className="border-gray-light border-t bg-grayscale-bg-dark p-2 flex">
        <FilePicker
          accept="image"
          onChange={(image) => {
            if (imagesSchema.safeParse({ image })) {
              setAttachedFiles((prev) => [
                ...prev,
                createFileWithMetadata(image),
              ]);
            }
          }}
          className="text-focus p-3 mr-2"
        >
          <ImageIcon />
        </FilePicker>
        <FilePicker
          accept="video"
          onChange={(video) => {
            if (videosSchema.safeParse({ video })) {
              setAttachedFiles((prev) => [
                ...prev,
                createFileWithMetadata(video),
              ]);
            }
          }}
          className="text-focus p-3 mr-2"
        >
          <VideoIcon />
        </FilePicker>
        <FilePicker
          onChange={(file) => {
            setAttachedFiles((prev) => [...prev, createFileWithMetadata(file)]);
          }}
          className="text-focus p-3 mr-2"
        >
          <AttachmentIcon />
        </FilePicker>
        <InputContainer className="flex-1">
          <Input
            register={register}
            name="text"
            className="flex-1"
            iconEnd={
              <button disabled={!canSubmitForm} type="submit">
                <SendIcon
                  className={cx(
                    'w-6 h-6',
                    canSubmitForm ? 'text-focus' : 'text-gray-light'
                  )}
                />
              </button>
            }
            placeholder={`${t('Message {{name}}', { name: title })}`}
          />
        </InputContainer>
      </div>
    </form>
  );
};

export default MessageForm;
