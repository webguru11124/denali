import { ChatMessageType } from 'app/api/chat/constants';
import {
  Message as ChatMessage,
  MessagesResponse,
  ThreadsResponse,
  ListThread,
  MessageFile,
} from 'app/api/chat/types';
import { AxiosResponse } from 'axios';
import { InfiniteData } from 'react-query';

export interface OptimisticallyUpdatedMessage extends ChatMessage {
  isResponseReceived: boolean;
}

export type UnionMessage = OptimisticallyUpdatedMessage | ChatMessage;

export interface TextGroupedMessage {
  messages: Array<ChatMessage>;
  isMe: boolean;
  ownerId: number;
  userAvatar: string;
  userName: string;
  type: ChatMessageType.text;
}

export interface ParticipantAddedGroupedMessage {
  message: ChatMessage;
  type: ChatMessageType.participantAdded;
}

export interface ParticipantRemovedGroupedMessage {
  message: ChatMessage;
  type: ChatMessageType.participantRemoved;
}

export interface TopicUpdatedGroupedMessage {
  message: ChatMessage;
  type: ChatMessageType.topicUpdated;
}

export type GroupedMessage =
  | TextGroupedMessage
  | ParticipantAddedGroupedMessage
  | ParticipantRemovedGroupedMessage
  | TopicUpdatedGroupedMessage;

export type GroupMessagesByOwnership = (
  messages: Array<ChatMessage>
) => Array<GroupedMessage>;

export type UpdateGroupedMessage = (
  messages: Array<GroupedMessage>,
  message: ChatMessage
) => Array<GroupedMessage>;

export type QueryCacheMessageResponse = MessagesResponse & {
  messages: Array<UnionMessage>;
};

export type ThreadMessagesCache = InfiniteData<
  AxiosResponse<QueryCacheMessageResponse>
>;

export interface FileWithMetadata {
  id: string;
  uploadedId?: string;
  isUploaded: boolean;
  file: File;
}
export type ThreadsCache = AxiosResponse<ThreadsResponse>;

export enum TabValue {
  about = 'about',
  members = 'members',
  settings = 'settings',
}

export enum SettingsModalFlow {
  default,
  addNewMember,
  deleteThread,
}

export type MappedListThread = ListThread & {
  hasUnreadMessages: boolean;
};

export interface GroupedFiles {
  files: Array<MessageFile>;
  media: Array<MessageFile>;
}
