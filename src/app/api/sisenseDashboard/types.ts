import { ResponsiveMediaSizes, Response, ResponsiveObject } from '../types';

export interface TokenResponse {
  token: string;
}


interface SisenseListItem {
  title: string;
  desc: string;
  oid: string;
}

export type SisenseListResponse  = Array<SisenseListItem>
