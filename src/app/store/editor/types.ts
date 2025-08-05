import { BasicChannelInfo } from 'submodules/common-ui/generated/api/gcs';

export interface State {
  audiences: Audience[];
  collaborators: Collaborator[];
  languages: Language[];
  currentArticleId?: number;
  channel: BasicChannelInfo | null;
  publishDate?: string | null;
  archiveDate?: string | null;
  canEdit: boolean;
}

export interface Language {
  name: string;
  code: string;
  isDefault: boolean;
  active: boolean;
}

export interface Collaborator {
  id: number;
  fullName: string;
  avatar: string;
  languages: string[];
  email: string;
}
export interface Audience {
  id: number;
  name: string;
  members: number;
}
