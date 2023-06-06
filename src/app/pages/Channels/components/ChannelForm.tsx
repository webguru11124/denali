import { useEditor } from '@craftjs/core';
import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import useCreateChannelMutation from 'app/api/channels/hooks/useCreateChannelQuery';
import useDeleteChannelMutation from 'app/api/channels/hooks/useDeleteChannelQuery';
import useUpdateChannelMutation from 'app/api/channels/hooks/useUpdateChannelMutationQuery';
import { Button, Input } from 'app/components';
import CheckBox from 'app/components/Checkbox';
import Switch from 'app/components/Switch';
import config from 'app/config';
import { useDispatch } from 'app/hooks';
import { actions } from 'app/store/channels';
import { AxiosError } from 'axios';
import {
  LocationTick,
  Trash,
  InfoCircle,
  ArrowUp2,
  ArrowDown2,
} from 'iconsax-react';
import noop from 'lodash/noop';
import {
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Popover } from 'react-tiny-popover';
import { toast } from 'react-toastify';
import MoreLineIcon from 'remixicon-react/MoreLineIcon';
import {
  BasicChannelInfo,
  ChannelTitleTranslation,
  CoverImageChannelFileGet,
  CreatedFileSlot,
  NewChannel,
} from 'submodules/common-ui/generated/api/gcs';

import { CHANNEL_INITIAL_DATA } from '../contants';
import { useChannelsContext } from '../context';
import { getSerializedParseObject } from '../hooks/helpers';
import useFormLanguages from '../hooks/useFormLanguages';
import { FormDefaultValue, ISOLanguage, TitleLanguage } from '../types';
import convertTitlesToVariants from '../utils';

import AlertInfo from './AlertInfo';
import BottomToast from './BottomToast';
import ChannelCoverImage from './ChannelCoverImage';
import ChannelItem, { ChannelItemProps } from './ChannelItem';
import DeleteModal from './DeleteModal';
import EmptyChannelForm from './EmptyChannelForm';
import { MAX_TITLE_LENGTH } from './newChannelFormSchema';

const Container = styled.form`
  box-shadow: 0px 0px 15px rgba(115, 117, 186, 0.08);
  & {
    scrollbar-width: thin;
    scrollbar-color: ${config.colors['black']} transparent;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${config.colors['hover-blue']};
    border-radius: 20px;
    border: 1px solid transparent;
  }
`;

const MoreButton = styled.button`
  border: 1px solid #fbfafa;
  box-shadow: 0px 0px 12px rgba(112, 112, 112, 0.1);
  transform: rotate(90deg);
`;

const ChannelForm = () => {
  const {
    channels,
    fields,
    formState,
    formType,
    selectedChannel,
    isImageUploading,
    movedBlock,
    hasChanges,
    append,
    getValues,
    handleSubmit,
    register,
    remove,
    setValue,
    trigger,
    update,
    watch,
    setNewChannel,
    selectFormType,
    setSelectedChannel,
    upload,
  } = useChannelsContext();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [titleSettingsIndex, setTitleSettingsIndex] = useState(-1);
  const [showLangsPopup, setShowLangsPopup] = useState(false);
  const [disabledForm, setDisabeldForm] = useState(false);

  const dispatch = useDispatch();

  const { allLanguages, languages, setSearch } = useFormLanguages();

  const optionsLangPopup = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLFormElement>(null);

  const { mutate: createChannel, isLoading: isCreateLoading } =
    useCreateChannelMutation();
  const { mutate: deleteChannel, isLoading: isDeleteLoading } =
    useDeleteChannelMutation();
  const { mutate: updateChannel, isLoading: isUpdateLoading } =
    useUpdateChannelMutation();

  const {
    query: { getNodes, parseSerializedNode },
    actions: { add, delete: deleteNode, setProp, selectNode },
    selectedNodeId,
  } = useEditor((state) => ({
    selectedNodeId: state.events.selected,
  }));

  const updateChannelBlock = useCallback(
    (
      channel: BasicChannelInfo & { isDraft?: boolean },
      nodeId = selectedNodeId
    ) => {
      nodeId.forEach((id) => {
        setProp(id, (props: ChannelItemProps) => {
          props.data = channel;
        });
      });
    },
    [selectedNodeId, setProp]
  );

  const onImageUpload = useCallback(
    ({
      image,
      response,
      nodeId,
    }: {
      image: File;
      response: CreatedFileSlot;
      nodeId: Set<string>;
    }): void => {
      const value: CoverImageChannelFileGet & { file: File } = {
        name: image.name,
        type: 'internal',
        url: response.url,
        file: image,
        id: response.id,
      };

      setValue('image', value);
      trigger('image');

      if (formType === 'new') {
        setNewChannel((oldState) => ({
          ...oldState,
          coverImage: value,
        }));
      }

      if (formType === 'edit') {
        updateChannelBlock(
          {
            ...selectedChannel,
            coverImage: value,
            isDraft: true,
          },
          nodeId
        );
      }
    },
    [
      formType,
      selectedChannel,
      setNewChannel,
      setValue,
      trigger,
      updateChannelBlock,
    ]
  );

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const image = e.target.files?.[0];
    e.target.value = '';
    if (!image) return;

    upload(image, {
      onSuccess: (response) =>
        onImageUpload({ image, response, nodeId: selectedNodeId }),
      onError: noop,
    });
  };

  const onChange = useCallback(
    (isDraft = true) => {
      const { image, titles, notify } = getValues();

      const treatedTitle = convertTitlesToVariants(titles);

      const payload: Partial<BasicChannelInfo> = {
        coverImage: image,
        title: treatedTitle,
        pushNotification: notify,
      };

      if (formType === 'new') {
        return setNewChannel((oldState) => ({
          ...oldState,
          ...payload,
        }));
      }

      if (formType === 'edit') {
        const channelData = {
          ...selectedChannel,
          ...payload,
          isDraft,
        };
        dispatch(actions.updateChannel(channelData));
        updateChannelBlock(channelData);
      }
    },
    [
      dispatch,
      formType,
      getValues,
      selectedChannel,
      setNewChannel,
      updateChannelBlock,
    ]
  );

  const addNewChannelBlock = useCallback(
    (props: ComponentProps<typeof ChannelItem>) => {
      const nodes = getNodes();
      for (const iterator of Object.keys(nodes)) {
        const hasEmptyBlock = nodes[iterator].data.name === 'EmptyChannels';
        if (hasEmptyBlock) deleteNode(iterator);
      }
      const serializedNode = getSerializedParseObject({
        name: 'ChannelItem',
        parent: 'dropableRegion',
        props,
      });
      const node = parseSerializedNode(serializedNode).toNode();
      add(node, 'dropableRegion', 0);
      selectNode(node.id);
    },
    [add, deleteNode, getNodes, parseSerializedNode, selectNode]
  );

  const deleteChannelBlock = useCallback(() => {
    selectedNodeId.forEach((id) => deleteNode(id));

    if (channels.length === 1) {
      const serializedNode = getSerializedParseObject({
        name: 'EmptyChannels',
        parent: 'staticBlock',
      });
      const node = parseSerializedNode(serializedNode).toNode();
      add(node, 'staticBlock');
    }
  }, [add, channels.length, deleteNode, parseSerializedNode, selectedNodeId]);

  const onSubmit = useCallback(
    async (submitData: FormDefaultValue) => {
      const { image, notify, titles } = submitData;

      const treatedTitle: ChannelTitleTranslation =
        convertTitlesToVariants(titles);

      if (!image) return;
      if (image?.type === 'external') return;

      const payload: NewChannel = {
        coverImage: {
          type: 'internal',
          id: image.id,
        },
        hideIfEmpty: true,
        pushNotification: notify,
        ranking: (channels[0]?.ranking ?? 0) + 1,
        title: treatedTitle,
      };

      if (formType === 'edit') {
        return updateChannel(
          { ...payload, id: selectedChannel.id },
          {
            onSuccess: (res) => {
              const data = res.data;
              const { title, coverImage, ranking, id } = data;

              onChange(false);
              dispatch(
                actions.updateRelevantChannel({
                  title,
                  coverImage,
                  ranking,
                  id,
                })
              );
              updateChannelBlock(data);
              toast(<BottomToast text={'Changes published'} />, {
                position: 'bottom-center',
                autoClose: 5000,
                closeButton: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                containerId: 'ChannelActions',
              });
            },
          }
        );
      }

      if (formType === 'new') {
        return createChannel(payload, {
          onSuccess: (res) => {
            const channel = res.data;
            dispatch(actions.setChannel(channel));
            setNewChannel(CHANNEL_INITIAL_DATA);
            selectFormType('edit', channel);
            setSelectedChannel(channel);
            addNewChannelBlock({ data: channel });
          },
          onError: (e) => {
            const { message } = e as AxiosError;
            toast(<BottomToast text={message} backgroundColor="error" />, {
              position: 'bottom-center',
              autoClose: 5000,
              closeButton: false,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              containerId: 'ChannelActions',
            });
          },
        });
      }
    },
    [
      addNewChannelBlock,
      channels,
      createChannel,
      dispatch,
      formType,
      onChange,
      selectFormType,
      selectedChannel.id,
      setNewChannel,
      setSelectedChannel,
      updateChannel,
      updateChannelBlock,
    ]
  );

  const onDelete = useCallback(() => {
    setShowDeleteModal(false);
    if (selectedChannel?.id) {
      deleteChannel(selectedChannel.id, {
        onSuccess: () => {
          dispatch(actions.deleteChannel(selectedChannel));
          deleteChannelBlock();
          selectFormType('empty');
        },
        onError: (e) => {
          const { message } = e as AxiosError;
          toast(<BottomToast text={message} backgroundColor="error" />, {
            position: 'bottom-center',
            autoClose: 5000,
            closeButton: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            containerId: 'ChannelActions',
          });
        },
      });
    }
  }, [
    deleteChannel,
    deleteChannelBlock,
    dispatch,
    selectFormType,
    selectedChannel,
  ]);

  const handleCheckLanguage = useCallback(
    (lang: ISOLanguage) => {
      setShowLangsPopup(false);
      const hasKeyIndex = watch().titles.findIndex(
        (title) => title.code === lang.code
      );
      setSearch('');
      if (hasKeyIndex !== -1) return remove(hasKeyIndex);

      append({
        checked: true,
        isMain: false,
        code: lang.code,
        name: lang.name,
        value: '',
      });
    },
    [watch, setSearch, remove, append]
  );

  const handleSelectMainLanguage = useCallback(
    (index: number) => {
      const { titles } = getValues();
      const lastMainIndex = titles.findIndex((title) => title.isMain);
      if (lastMainIndex !== -1)
        update(lastMainIndex, { ...titles[lastMainIndex], isMain: false });

      update(index, {
        ...titles[index],
        isMain: true,
      });

      onChange();
    },
    [getValues, update, onChange]
  );

  const scrollForm = () =>
    containerRef.current?.scrollTo({
      behavior: 'smooth',
      top: containerRef.current.scrollHeight,
    });

  const toggleLangsPopup = () => setShowLangsPopup((oldState) => !oldState);

  const handleRemoveLanguage = useCallback(
    (field: TitleLanguage, index: number) => {
      if (field.isMain) {
        const nextField = fields[index + 1] ? index + 1 : index - 1;
        handleSelectMainLanguage(nextField);
      }
      remove(index);
      onChange(true);
    },
    [fields, handleSelectMainLanguage, onChange, remove]
  );

  const renderTitleContainer = useCallback(() => {
    if (formType === 'new') {
      return (
        <div>
          <h5 className="font-semibold leading-8 text-lg">Create Channel</h5>
          <span className="text-grayscale-secondary text-sm">
            Create channel by adding cover image & title.
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex justify-between items-center">
          <div>
            <h5 className="font-semibold leading-8 text-lg">
              Channel Settings
            </h5>
            <span className="text-grayscale-secondary text-sm">
              Change title, image or add language
            </span>
          </div>
          <button
            className="bg-hover-blue rounded-lg flex justify-center items-center h-11 w-11"
            onClick={() => setShowDeleteModal(true)}
            type="button"
            disabled={isDeleteLoading}
          >
            <Trash size={24} color={config.colors.focus} />
          </button>
        </div>
      );
    }
  }, [formType, isDeleteLoading]);

  const selectedLanguages = watch().titles.filter((lang) => lang.checked);

  const getLanguageName = (code: string) => {
    return allLanguages.find((lang) => lang.code === code)?.name ?? '';
  };

  const hasArticleChanges = channels.find(
    (e) => e.id === selectedChannel?.id
  )?.isDraft;

  const canPublishChanges =
    formState.isValid && hasArticleChanges && !isImageUploading;

  const ArrowIcon = showLangsPopup ? ArrowUp2 : ArrowDown2;

  useEffect(() => {
    if (showLangsPopup) scrollForm();
  }, [showLangsPopup]);

  useEffect(() => {
    const isHidden = !!(movedBlock && hasChanges);
    setDisabeldForm(isHidden);
  }, [hasChanges, movedBlock]);

  if (formType === 'empty') return <EmptyChannelForm />;

  return (
    <>
      <Container
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => onChange()}
        id="channelForm"
        ref={containerRef}
        className={cx(
          'border-[1px] border-solid bg-white rounded-2xl border-hover-blue px-4 py-6 flex flex-col gap-4  overflow-y-scroll col-span-4 w-full mb-4',
          {
            'pb-[12rem]': showLangsPopup,
            'pointer-events-none opacity-50': disabledForm,
          }
        )}
      >
        {renderTitleContainer()}

        <label htmlFor="image-input">
          <h5 className="font-semibold leading-5 mb-4">
            Cover Image<span className="text-error">*</span>
          </h5>
          <ChannelCoverImage
            key={watch().image?.url}
            isLoading={isImageUploading}
            image={watch().image}
          />
          <input
            {...register('image')}
            className="hidden"
            type="file"
            name=""
            id="image-input"
            onChange={onImageChange}
            accept="image/*"
          />
        </label>
        <div className="relative">
          <h5 className="font-semibold leading-5 mb-4">
            Channel Title<span className="text-error">*</span>
          </h5>
          <div className="border-gray-light border-[1px] rounded-lg p-3 text-sm">
            {fields.map((field, index) => (
              <Popover
                isOpen={index === titleSettingsIndex}
                positions={['bottom', 'right']}
                onClickOutside={() => setTitleSettingsIndex(-1)}
                containerClassName="z-50 shadow-atobi rounded-lg bg-white min-w-[220px]"
                content={
                  <div className="w-full">
                    {!field.isMain && (
                      <button
                        className={cx(
                          'flex gap-2 p-4 py-3 items-center w-full bg-white rounded-t-lg',
                          {
                            'hover:bg-focus-background': !field.isMain,
                          }
                        )}
                        onClick={() => handleSelectMainLanguage(index)}
                        disabled={field.isMain}
                      >
                        <LocationTick />
                        <span>Set as Main Language</span>
                      </button>
                    )}
                    <button
                      className={cx(
                        'flex gap-2 p-4 py-3 items-center w-full rounded-b-lg',
                        {
                          'bg-white':
                            field.isMain || selectedLanguages.length === 1,
                          'hover:bg-focus-background':
                            selectedLanguages.length > 1,
                          'rounded-t-lg': field.isMain,
                        }
                      )}
                      onClick={() => handleRemoveLanguage(field, index)}
                      disabled={selectedLanguages.length === 1}
                    >
                      <Trash />
                      <span>Remove</span>
                    </button>
                  </div>
                }
                parentElement={optionsLangPopup.current[index]}
              >
                <div
                  className={`relative z-[${selectedLanguages.length - index}]`}
                  key={field.code}
                >
                  <span className=" font-semibold flex text-sm">
                    {getLanguageName(field.code)}
                    {field.isMain && (
                      <span className="pl-1 font-normal flex text-grayscale-secondary items-center justify-center">
                        <LocationTick size={16} />
                        <span className="pl-1">Main</span>
                      </span>
                    )}
                  </span>
                  <div className="flex flex-row gap-2 pb-4 pt-2">
                    <div className="border-[1px] border-gray-light rounded-lg grow">
                      <Input
                        inputClassName="py-[10px] focus"
                        register={register}
                        name={`titles.${index}.value`}
                        key={field.id}
                        placeholder="e.g. Product Training or News"
                        containerClassName="focus-within:border-focus"
                        maxLength={MAX_TITLE_LENGTH}
                        contentEnd={
                          <span className="text-xs text-grayscale-secondary">{`${
                            watch().titles?.[index].value.length
                          }/${MAX_TITLE_LENGTH}`}</span>
                        }
                      />
                    </div>
                    <MoreButton
                      className="h-[44px] w-[44px] bg-white flex justify-center items-center rounded-lg z-[2]"
                      onClick={() => {
                        if (titleSettingsIndex !== index)
                          setTitleSettingsIndex(index);
                        else setTitleSettingsIndex(-1);
                      }}
                      type="button"
                    >
                      <MoreLineIcon />
                    </MoreButton>
                  </div>
                </div>
              </Popover>
            ))}
            <Popover
              isOpen={showLangsPopup}
              onClickOutside={() => setShowLangsPopup(false)}
              positions={['bottom']}
              content={
                <div
                  className={cx(
                    'w-[300px] mb-4 bg-light rounded-lg shadow-atobi'
                  )}
                >
                  <div className="flex p-4 pb-0 border-b border-gray-light flex-col gap-2">
                    <Input
                      name="search-language"
                      placeholder="Search for language"
                      onChange={(e) => setSearch(e.target.value)}
                      className="border-[1px] border-gray-dark rounded-lg"
                    />
                    <div className="h-[16rem] overflow-auto pb-4">
                      {languages.map((lang) => {
                        const title = watch().titles.find(
                          (e) => e.code === lang.code
                        );
                        return (
                          <div
                            key={lang.code}
                            className={cx('flex gap-2 px-2 py-1 rounded-sm', {
                              'bg-grayscale-bg-dark grayscale': title?.isMain,
                              'bg-focus-background': title?.checked,
                            })}
                          >
                            <CheckBox
                              id={lang.code}
                              onChange={() =>
                                !title?.isMain && handleCheckLanguage(lang)
                              }
                              checked={!!(title?.checked ?? title?.isMain)}
                              className={cx({
                                'opacity-70': title?.isMain,
                              })}
                            />
                            <span
                              className={cx({
                                'text-grayscale-secondary': title?.isMain,
                              })}
                            >
                              {lang.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              }
            >
              <button
                type="button"
                className="flex justify-between items-center pt-4 border-t-[1px] border-gray-light w-full"
                onClick={toggleLangsPopup}
              >
                <span className="flex gap-2">
                  Add Title Translation
                  <span className="h-[25px] w-[25px]  bg-focus rounded-sm text-white flex items-center justify-center text-sm">
                    {selectedLanguages.length}
                  </span>
                </span>
                <ArrowIcon onClick={toggleLangsPopup} size={16} />
              </button>
            </Popover>
          </div>
        </div>
        <div>
          <h5 className="font-semibold leading-8">Channel Notifications</h5>
          <div className="flex items-center justify-between">
            <span className="text-grayscale-secondary text-sm inline-block">
              Notify members when article is published
            </span>
            <Switch
              checked={watch().notify}
              onChange={(e) => {
                setValue('notify', e);
                onChange();
              }}
              width={40}
              height={20}
              handleDiameter={18}
            />
          </div>
        </div>
        {!watch().notify && (
          <AlertInfo
            Icon={InfoCircle}
            description="Members will not receive notifications about any new article published in this channel."
            className="py-2"
            iconSize={22}
            style={{ gap: 8 }}
          />
        )}
        {formType === 'new' && (
          <div className="flex gap-2 pt-3">
            <Button className="bg-hover-blue border-0 text-focus">
              Cancel
            </Button>
            <Button
              type="submit"
              className={cx('border-0', {
                'bg-focus text-white': formState.isValid,
                'bg-gray-dark text-grayscale-secondary': !formState.isValid,
              })}
              loading={isCreateLoading}
            >
              Create Channel
            </Button>
          </div>
        )}
        {formType === 'edit' && (
          <div className="flex gap-2 pt-3">
            <Button
              type="submit"
              className={cx('border-0', {
                'bg-focus text-white': formState.isValid,
                'bg-gray-dark text-grayscale-secondary': !canPublishChanges,
              })}
              disabled={!canPublishChanges}
              loading={isUpdateLoading}
            >
              Publish changes
            </Button>
          </div>
        )}
      </Container>
      {showDeleteModal && (
        <DeleteModal
          onConfirm={onDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default ChannelForm;
