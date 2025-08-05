import { UserStatus } from 'app/api/user/types';
import { BasicArticleInfoStatusEnum } from 'submodules/common-ui/generated/api/gcs';
export interface State {
  articlesTab: Exclude<BasicArticleInfoStatusEnum, 'rejected'>;
  audiencesTab: string;
  membersTab: UserStatus;
}
