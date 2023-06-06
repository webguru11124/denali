import { TextFormatType } from 'lexical';

type IconTypeFormat = {
  id: number;
  icon: React.ReactNode;
  active: boolean;
};

interface TextFormat extends IconTypeFormat {
  type: TextFormatType;
}

interface ListFormat extends IconTypeFormat {
  onClick: () => void;
}

interface SerializedLexicalText {
  detail?: number;
  format: number | string;
  mode?: string;
  style?: string;
  text?: string;
  type: string;
  version: number;
  children?: SerializedLexicalText[];
  direction?: string | null;
  indent?: number;
  value?: number | string;
  tag?: string;
  listType?: string;
  start?: number;
  url?: string;
}

interface SerializedLexicalState {
  root: {
    children: SerializedLexicalText[];
    direction: string;
    format: string;
    indent: number;
    type: string;
    version: number;
  };
}

export enum EnumTextFormat {
  'normal' = 0,
  'bold' = 1,
  'italic' = 2,
  'underline' = 8,
}

export type {
  TextFormat,
  ListFormat,
  IconTypeFormat,
  SerializedLexicalState,
  SerializedLexicalText,
};

export const blockTypeToBlockName = {
  code: 'Code Block',
  h1: 'Heading',
  h2: 'Subheading',
  ol: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote',
  ul: 'Bulleted List',
};

export type EditorBlockName = keyof typeof blockTypeToBlockName;
