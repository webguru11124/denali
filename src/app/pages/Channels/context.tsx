import { Editor } from '@craftjs/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChannelCoverImage, NewChannelInfo } from 'app/api/channels/types';
import { useSelector } from 'app/hooks';
import useFileUpload, { UploadConfig } from 'app/hooks/useFileUpload';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  FieldArrayWithId,
  FormState,
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { BasicChannelInfo } from 'submodules/common-ui/generated/api/gcs';

import ChannelItem from './components/ChannelItem';
import EmptyChannels from './components/EmptyChannels';
import { schema, MAX_TITLE_LENGTH } from './components/newChannelFormSchema';
import NewChannelItem from './components/NewChannelItem';
import { CHANNEL_INITIAL_DATA, FORM_DEFAULT_VALUES } from './contants';
import {
  TitleLanguage,
  FormDefaultValue,
  FormType,
  UseFormHook,
  DraftChannelInfo,
} from './types';

const uninitialisedFunction = () => new Error('Uninitialsed Function');

export const ChannelsContext = createContext<ChannelsContextValues>({
  channels: [],
  selectedChannel: CHANNEL_INITIAL_DATA,
  newChannel: CHANNEL_INITIAL_DATA,
  fields: [],
  formType: 'new',
  formState: {} as FormState<FormDefaultValue>,
  hasChanges: false,
  movedBlock: undefined,
  isImageUploading: false,
  upload: () => null,
  selectFormType: uninitialisedFunction,
  append: uninitialisedFunction,
  remove: uninitialisedFunction,
  update: uninitialisedFunction,
  register:
    uninitialisedFunction as unknown as UseFormRegister<FormDefaultValue>,
  handleSubmit:
    uninitialisedFunction as unknown as UseFormHandleSubmit<FormDefaultValue>,
  watch: uninitialisedFunction as unknown as UseFormGetValues<FormDefaultValue>,
  setValue: uninitialisedFunction,
  getValues:
    uninitialisedFunction as unknown as UseFormGetValues<FormDefaultValue>,
  trigger: async () => true,
  setSelectedChannel: uninitialisedFunction,
  setNewChannel: uninitialisedFunction,
  setHasChanges: uninitialisedFunction,
  setMovedBlock: uninitialisedFunction,
});

interface ChannelsContextValues extends UseFormHook {
  channels: DraftChannelInfo[];
  selectedChannel: BasicChannelInfo;
  newChannel: NewChannelInfo;
  fields: FieldArrayWithId<FormDefaultValue, 'titles', 'id'>[];
  formType: FormType;
  hasChanges: boolean;
  movedBlock: string | undefined;
  isImageUploading: boolean;
  append: UseFieldArrayAppend<FormDefaultValue, 'titles'>;
  remove: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<FormDefaultValue, 'titles'>;
  setSelectedChannel: React.Dispatch<React.SetStateAction<BasicChannelInfo>>;
  setNewChannel: React.Dispatch<React.SetStateAction<BasicChannelInfo>>;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  setMovedBlock: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectFormType: (type: FormType, data?: BasicChannelInfo) => void;
  upload: (file: File, { onSuccess, onError }: UploadConfig) => void;
}

type ContextProps = {
  children: ReactNode;
};

const ChannelsContextProvider = ({ children }: ContextProps) => {
  const channels = useSelector(({ channels: _channels }) => _channels.channels);
  const [selectedChannel, setSelectedChannel] =
    useState<BasicChannelInfo>(CHANNEL_INITIAL_DATA);
  const [newChannel, setNewChannel] =
    useState<BasicChannelInfo>(CHANNEL_INITIAL_DATA);
  const [formType, setFormType] = useState<FormType>('empty');
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [movedBlock, setMovedBlock] = useState<string>();
  const [blocksHistory, setBlocksHistory] = useState('');

  const { upload, isLoading: isImageUploading } = useFileUpload();

  const {
    register,
    handleSubmit,
    control,
    formState,
    watch,
    setValue,
    getValues,
    trigger,
    reset,
  } = useForm({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'titles',
    rules: {
      minLength: 3,
      maxLength: MAX_TITLE_LENGTH,
    },
  });

  const handleContentEditable = (
    editData: BasicChannelInfo
  ): FormDefaultValue => {
    const { coverImage, pushNotification, title: channelTitle } = editData;
    const titles: TitleLanguage[] = Object.keys(channelTitle).map((e) => {
      const { isDefault, title } = channelTitle[e];
      return {
        checked: true,
        isMain: isDefault,
        code: e,
        name: e,
        value: title.slice(0, MAX_TITLE_LENGTH),
      };
    });
    return {
      image: coverImage as ChannelCoverImage,
      notify: pushNotification,
      titles,
    };
  };

  const selectFormType = useCallback(
    (type: FormType, channelData: BasicChannelInfo = CHANNEL_INITIAL_DATA) => {
      setFormType(type);
      const content = handleContentEditable(channelData);
      reset(content);
    },
    [reset]
  );

  const contextValue: ChannelsContextValues = {
    channels,
    selectedChannel,
    newChannel,
    formType,
    formState,
    fields,
    hasChanges,
    movedBlock,
    isImageUploading,
    setSelectedChannel,
    setNewChannel,
    selectFormType,
    setHasChanges,
    setMovedBlock,
    append,
    remove,
    update,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    upload,
  };

  return (
    <ChannelsContext.Provider value={contextValue}>
      <Editor
        resolver={{ ChannelItem, NewChannelItem, EmptyChannels }}
        enabled={!isImageUploading}
        onNodesChange={(e) => {
          const parsedNodes = JSON.stringify(
            e.getNodes().dropableRegion.data.nodes
          );
          if (
            blocksHistory !== parsedNodes &&
            blocksHistory &&
            parsedNodes.length === blocksHistory.length
          ) {
            setHasChanges(true);
          } else {
            setHasChanges(false);
          }
          setBlocksHistory(parsedNodes);
        }}
        onBeforeMoveEnd={(e) => {
          const parsedId = JSON.parse(JSON.stringify(e.id));
          setMovedBlock(parsedId);
        }}
      >
        {children}
      </Editor>
    </ChannelsContext.Provider>
  );
};

const useChannelsContext = () => {
  const context = useContext(ChannelsContext);

  if (context === undefined) {
    throw new Error(
      'useChannelsContext must be used within a ChannelsContextProvider'
    );
  }

  return context;
};

export { ChannelsContextProvider, useChannelsContext };
export type { ChannelsContextValues };
