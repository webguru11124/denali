import { SerializedLexicalState } from 'app/components/LexicalEditor/types';

export interface InitialType {
  text?: string;
  type?: 'heading' | 'paragraph' | 'list';
  tag?: string;
}

const generateInitialState = (initialState?: InitialType): string => {
  const specificBlockState =
    {} as SerializedLexicalState['root']['children'][0];

  if (initialState?.type === 'list') {
    if (initialState.tag === 'ol') specificBlockState.listType = 'number';
    if (initialState.tag === 'ul') specificBlockState.listType = 'bullet';
  }

  const state: SerializedLexicalState = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: initialState?.text ?? '',
              type: 'text',
              version: 1,
            },
          ],
          ...specificBlockState,
          direction: 'ltr',
          format: '',
          indent: 0,
          type: initialState?.type ?? 'paragraph',
          version: 1,
          tag: initialState?.tag,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  };
  return JSON.stringify(state);
};

export default generateInitialState;
