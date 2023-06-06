import {
  EnumTextFormat,
  SerializedLexicalState,
  SerializedLexicalText,
} from 'app/components/LexicalEditor/types';
import {
  TextBlockVariant,
  TextFormat,
  ListItem,
  TextOrLink,
} from 'submodules/common-ui/generated/api/gcs';

enum TextType {
  'list-item' = 'listitem',
  'text' = 'text',
  'link' = 'link',
}

const getFormat = (format: TextFormat) => {
  if (!format) return '';

  let formatNumber = 0;
  if (format?.bold) formatNumber += EnumTextFormat['bold'];
  if (format?.italic) formatNumber += EnumTextFormat['italic'];
  if (format?.underline) formatNumber += EnumTextFormat['underline'];

  return formatNumber;
};

const getChildren = (children: TextOrLink[] | ListItem[]) => {
  const blocks: SerializedLexicalText[] = children.map((block, index) => {
    const formatChildren = {} as Partial<SerializedLexicalText>;

    if (block.type === 'text') {
      formatChildren.text = String(block.value);
      formatChildren.format = getFormat(block.format);
    }

    if (block.type !== 'text') {
      formatChildren.children = getChildren(block.children);
    }

    if (block.type && TextType[block.type] === 'listitem') {
      formatChildren.value = index + 1;
    }

    const lexicalNode: SerializedLexicalText = {
      ...formatChildren,
      detail: 0,
      format: formatChildren.format ?? EnumTextFormat.normal,
      mode: 'normal',
      type: TextType[block.type],
      version: 1,
      direction: 'ltr',
      indent: 0,
      url: formatChildren.url,
    };
    return lexicalNode;
  });

  return blocks;
};

const apiToEditor = (nodes: TextBlockVariant): SerializedLexicalState => {
  const paragraphs: SerializedLexicalText[] = nodes.items.map((node) => {
    const lexicalBlock = {} as Partial<SerializedLexicalText>;
    if (node.type === 'list') {
      lexicalBlock.listType = node.listType;
    } else if (node.type === 'heading' && node?.level) {
      lexicalBlock.tag = `h${node.level}`;
    }

    return {
      children: getChildren(node.children),
      direction: 'ltr',
      format: '',
      indent: 0,
      type: node.type,
      version: 1,
      start: 1,
      ...lexicalBlock,
    };
  });

  return {
    root: {
      children: paragraphs,
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  };
};

export default apiToEditor;
