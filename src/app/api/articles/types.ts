import { ArticleStatusEnum } from 'submodules/common-ui/generated/api/gcs';

import { PaginatedResponse } from '../types';

/* eslint-disable @typescript-eslint/no-empty-interface */
interface BaseBlock<Type extends string> {
  id: string;
  position: number;
  type: Type;
}

interface PDFBlock extends BaseBlock<'pdf'> {}

type RowColumn = NonRowPublicationBlock | null | undefined;

interface RowBlock extends BaseBlock<'row'> {
  columns: [RowColumn, RowColumn];
}

interface TextNode {
  type: 'text';
  value: string;
  format: 'normal' | 'bold' | 'italic';
}

interface ParagraphNode {
  type: 'paragraph';
  children: Array<TextNode>;
}

interface TextBlock extends BaseBlock<'text'> {
  children: Array<ParagraphNode>;
}

interface UrlBlock extends BaseBlock<'url'> {
  url: string;
  name: string;
  openIn: 'current-window' | 'new-window';
}

type PublicationBlock = PDFBlock | RowBlock | TextBlock | UrlBlock;
type NonRowPublicationBlock = Exclude<PublicationBlock, RowBlock>;

export interface Article {
  id: string;
  title: string;
  status: ArticleStatusEnum;
  publishedAt: string;
  archivedAt?: string;
  tenantId: number;
  createdAt: string;
  updatedAt: string;
  blocks: Array<ArticleBlock>;
}

interface ArticleBlock {
  id: string;
  articleId: string;
  content: ArticleBlockContent;
  parentId?: number;
  blockTypeId: number;
  position: number;
  version: number;
  tenantId: number;
  createdAt: string;
  updatedAt: string;
}

interface ArticleBlockContent {
  text: UrlBlock | ParagraphNode;
  locale: string;
}

export type ArticlesResponse = PaginatedResponse<Array<Article>>;
