import { SerializedLexicalText } from 'app/components/LexicalEditor/types';
import { SerializedLexicalNode } from 'lexical';
import {
  ListItem,
  TextVariantItem,
  TextOrLink,
  TextBlockVariant,
} from 'submodules/common-ui/generated/api/gcs';

const getFormat = (format: SerializedLexicalText['format']) => {
  const isBold = format === 1 || format === 3 || format === 9 || format === 11;
  const isItalic =
    format === 2 || format === 3 || format === 10 || format === 11;
  const underline =
    format === 8 || format === 9 || format === 10 || format === 11;

  const textFormat =
    typeof format === 'number'
      ? {
          bold: isBold,
          italic: isItalic,
          underline: underline,
        }
      : undefined;

  return textFormat;
};

const getTextType = (type: string): TextVariantItem['type'] => {
  if (type === 'heading') return 'heading';
  else if (type === 'list') return 'list';
  else return 'paragraph';
};

const editorToApi = (editor: SerializedLexicalNode[]): TextBlockVariant => {
  const items = editor.map((item): TextVariantItem => {
    const blockItem = item as SerializedLexicalText;
    const { children: pChildren } = blockItem;

    const itemChildren = pChildren ?? [];

    const textType = getTextType(item.type);

    if (textType === 'list') {
      const treatedChildren: ListItem[] = itemChildren.map((child) => {
        return {
          children: (child.children ?? []).map((each) => {
            return {
              type: 'text',
              format: getFormat(each.format) ?? {},
              value: each.text ?? '',
            };
          }),
          type: 'list-item',
        };
      });
      return { children: treatedChildren, type: 'list', listType: 'bullet' };
    }

    if (textType === 'heading') {
      const treatedChildren: TextOrLink[] = itemChildren.map((child) => {
        if (item.type === 'link') {
          return {
            type: 'link',
            children: (child.children ?? []).map((eachPart) => {
              return {
                format: getFormat(eachPart.format) ?? {},
                type: 'text',
                value: eachPart?.text ?? '',
              };
            }),
            url: child.url ?? '',
          };
        }

        return {
          type: 'text',
          format: getFormat(child.format) ?? {},
          value: child.text ?? '',
        };
      });
      return {
        children: treatedChildren,
        level: Number(blockItem.tag?.substring(1, 2)),
        type: 'heading',
      };
    }

    return {
      children: (itemChildren ?? []).map((each) => {
        return {
          type: 'text',
          format: getFormat(each.format) ?? {},
          value: each.text ?? '',
        };
      }),

      type: 'paragraph',
    };
  });

  return {
    translationStatus: 'draft',
    items,
  };
};

export default editorToApi;
