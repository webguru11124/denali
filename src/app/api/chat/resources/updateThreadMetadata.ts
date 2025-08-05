import { request } from '../request';

interface ThreadMetadataUpdateRequest {
  threadId: string;
  lastMessageReadOn: Date;
}

const updateThreadMetadata = ({
  threadId,
  lastMessageReadOn,
}: ThreadMetadataUpdateRequest) =>
  request().patch<void>(`/api/thread/${threadId}/metadata`, {
    lastMessageReadOn: lastMessageReadOn.toISOString(),
  });

export type { ThreadMetadataUpdateRequest };
export default updateThreadMetadata;
