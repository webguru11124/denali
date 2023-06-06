import { Response } from '../types';

import { ThreadType, ChatMessageType } from './constants';

export interface ChatTokenResponse {
  expiresOn: string;
  token: string;
  userCommunicationId: string;
  userId: string;
}

export interface ThreadUser {
  avatarUrl: string;
  isMe: boolean;
  userId: number;
  name: string;
}

export interface BaseThread {
  createdBy: ThreadUser;
  id: string;
  lastMessageReceivedOn?: string;
  lastMessageReadOn?: string;
  topic: string;
  deletedOn?: string;
}

export interface ListThreadDirect extends BaseThread {
  participants: Array<ThreadUser>;
  type: ThreadType.direct;
}

export interface ListThreadGroup extends BaseThread {
  type: ThreadType.group;
  participants: undefined;
}

export type ListThread = ListThreadDirect | ListThreadGroup;

export type ThreadsResponse = Array<ListThread>;

export interface Thread {
  createdBy: ThreadUser;
  createdOn: string;
  id: string;
  participants: Array<ThreadUser>;
  topic: string;
  type: ThreadType;
}

export type Kind = 'communicationUser';

export interface MessageInitiator {
  communicationUserId: string;
  kind: Kind;
}

export interface MessageParticipantID {
  communicationUserId: string;
  fullName: string;
  kind: Kind;
  userId: number;
}

export interface MessageParticipant {
  id: MessageParticipantID;
  shareHistoryTime: string;
}

export interface MessageContent {
  message?: string;
  initiator?: MessageInitiator;
  participants?: Array<MessageParticipant>;
  topic?: string;
}

interface Sender {
  kind: Kind;
  communicationUserId: string;
  userId: number;
  fullName: string;
  avatar?: string;
}

interface MessageMetadata {
  clientId?: string;
  replyMessageId?: string;
}

export interface MessageFile {
  id: string;
  mimeType: string;
  name: string;
  relativeUrl: string;
}

export interface Message {
  id: string;
  type: ChatMessageType;
  sequenceId: string;
  version: string;
  senderDisplayName?: string;
  createdOn: string;
  editedOn?: string;
  deletedOn?: string;
  content: MessageContent;
  sender?: Sender;
  isMine?: boolean;
  files?: Array<MessageFile>;
  reply?: Omit<Message, 'reply'>;
  metadata?: MessageMetadata;
}

export interface MessagesResponse {
  hasMore: boolean;
  continuationToken: string;
  messages: Array<Message>;
}

export interface PostMessageRequest {
  text: string;
  clientId?: string;
  files: {
    addedIds: Array<string>;
  };
  reply?: Omit<Message, 'reply'>;
}

export interface GetMessagesRequest {
  id: string;
  continuationToken?: string;
  pageSize?: number;
}

export interface GetAvailableParticipantsRequest {
  limit?: number;
  query?: string;
}

export interface Location {
  id: number;
  name: string;
}

export interface Profession {
  id: number;
  name: string;
}

export interface AvailableParticipant {
  fullName: string;
  id: number;
  locations: Array<Location>;
  messengerUsername: string;
  professions: Array<Profession>;
}

export interface ThreadParticipant {
  avatarUrl: string;
  communicationUserId: string;
  location: Location;
  name: string;
  profession: Profession;
  userId: number;
}

export type ThreadParticipantsResponse = Array<ThreadParticipant>;

export type AvailableParticipantsResponse = Response<
  Array<AvailableParticipant>
>;

export interface UpdateThreadRequest {
  topic: string;
}

export interface UploadFileRequest {
  name: string;
  threadId: string;
  mimeType: string;
  chatToken: string;
  authToken: string;
}

export interface UploadFileResponse {
  id: string;
  url: string;
  headers: { [key: string]: string };
}

export interface ReceiptValue {
  chatMessageId: string;
  readOn: string;
  sender: {
    kind: string;
    communicationUserId: string;
  };
}

export interface Receipt {
  threadId: string;
  value?: ReceiptValue;
}

export type ReceiptsResponse = Array<Receipt>;

export interface AcsTokenResponse {
  token: string;
}

export interface UserResponse {
  [id: number]: {
    userCommunicationId: string | undefined;
  };
}

export interface Settings {
  acsEndpoint: string;
  maxParticipantCount: number;
  maxTopicLength: number;
}
