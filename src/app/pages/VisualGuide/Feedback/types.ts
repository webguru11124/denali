import { ResponsiveMediaSizes } from 'app/api/types';

export interface User {
  id: number;
  avatars: ResponsiveMediaSizes;
  name: string;
}
