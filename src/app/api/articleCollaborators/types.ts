import { PublicUserProfile } from '../user/types';

export interface ArticleCollaborator
  extends Pick<
    PublicUserProfile,
    'id' | 'avatars' | 'location' | 'profession' | 'email'
  > {
  fullName: string;
}
