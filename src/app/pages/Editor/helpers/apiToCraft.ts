import { SerializedNode } from '@craftjs/core/lib/interfaces/nodes';
import config from 'app/config';
import CoverImageBlock from 'app/pages/ArticleEditor/components/blocks/CoverImageBlock';
import ImageBlock from 'app/pages/ArticleEditor/components/blocks/ImageBlock';
import PDFBlock from 'app/pages/ArticleEditor/components/blocks/PDFBlock';
import SimpleTask from 'app/pages/ArticleEditor/components/blocks/SimpleTask';
import TextBlock from 'app/pages/ArticleEditor/components/blocks/TextBlock';
import TitleBlock from 'app/pages/ArticleEditor/components/blocks/TitleBlock';
import UrlBlock from 'app/pages/ArticleEditor/components/blocks/UrlBlock';
import VideoBlock from 'app/pages/ArticleEditor/components/blocks/VideoBlock';
import { ComponentProps } from 'react';
import {
  Article,
  Block,
  ImageBlockV1,
  TextBlockV1,
  UrlBlockV1,
  PdfBlockV1,
  VideoBlockV1,
  SimpleTaskBlockV1,
  MediaTaskBlockV1,
} from 'submodules/common-ui/generated/api/gcs';

import BlockTypes from './constants';

export type ExtendedSerializedNode = SerializedNode & {
  id: string;
  position: number;
};

const getBlockNodes = (block: Block, variant: string, mainVariant?: string) => {
  if (!block) return {};
  if (!('variants' in block)) return {};

  switch (block.type) {
    case 'url':
      return getSerializedUrlBlock(block, variant, mainVariant);
    case 'image':
      return getSerializedImageBlock(block, variant, mainVariant);
    case 'video':
      return getSerializedVideoBlock(block, variant, mainVariant);
    case 'text':
      return getSerializedTextBlock(block, variant, mainVariant);
    case 'pdf':
      return getSerializedPDFBlock(block, variant, mainVariant);
    case 'simple_task':
    case 'media_task':
      return getSerializedTaskBlock(block, variant, mainVariant);
    default:
      return {};
  }
};

const getSerializedUrlBlock = (
  block: UrlBlockV1,
  variant: string,
  mainVariant?: string
): Record<string, ExtendedSerializedNode> => {
  const language = mainVariant ?? variant;
  const props: ComponentProps<typeof UrlBlock> = {
    name: block.variants[language].name,
    url: block.variants[language].url,
    openIn: block.variants[language].openIn,
  };

  return {
    [block.id]: {
      parent: 'dropableRegion',
      id: block.id.toString(),
      position: block.position,
      type: { resolvedName: BlockTypes.UrlBlock },
      displayName: BlockTypes.UrlBlock,
      hidden: false,
      isCanvas: false,
      nodes: [],
      linkedNodes: {},
      props: props,
    },
  };
};

const getSerializedImageBlock = (
  block: ImageBlockV1,
  variant: string,
  mainVariant?: string
): Record<string, ExtendedSerializedNode> => {
  const language = mainVariant ?? variant;

  const imageSchema = block.variants[language];

  const props: ComponentProps<typeof ImageBlock> = {};

  if (imageSchema.type === 'internal') {
    props.imageSchema = {
      url: `${config.env.articlesApiUrl}/${imageSchema.url}`,
      name: imageSchema.name,
      type: imageSchema.type,
      tenantId: imageSchema.tenantId,
      id: imageSchema.id,
      translationStatus: 'draft',
    };
  } else {
    props.imageSchema = {
      url: imageSchema.url,
      name: imageSchema.name,
      type: imageSchema.type,
      translationStatus: 'draft',
    };
  }

  const type = imageSchema.url.match(/^https:\/\/media\d+\.giphy\.com/)
    ? BlockTypes.GiphyBlock
    : BlockTypes.ImageBlock;

  return {
    [block.id]: {
      parent: 'dropableRegion',
      id: block.id.toString(),
      position: block.position,
      type: { resolvedName: type },
      displayName: type,
      hidden: false,
      isCanvas: false,
      nodes: [],
      linkedNodes: {},
      props,
    },
  };
};

const getSerializedVideoBlock = (
  block: VideoBlockV1,
  variant: string,
  mainVariant?: string
): Record<string, ExtendedSerializedNode> => {
  const language = mainVariant ?? variant;
  const videoSchema = block.variants[language];

  const props: ComponentProps<typeof VideoBlock> = {};

  if (videoSchema.type === 'internal') {
    props.videoSchema = {
      url: `${config.env.articlesApiUrl}/${videoSchema.url}`,
      name: videoSchema.name,
      type: videoSchema.type,
      tenantId: videoSchema.tenantId,
      id: videoSchema.id,
      translationStatus: 'draft',
    };
  } else {
    props.videoSchema = {
      url: videoSchema.url,
      name: videoSchema.name,
      type: videoSchema.type,
      translationStatus: 'draft',
    };
  }

  return {
    [block.id]: {
      parent: 'dropableRegion',
      id: block.id.toString(),
      position: block.position,
      type: { resolvedName: BlockTypes.VideoBlock },
      displayName: BlockTypes.VideoBlock,
      hidden: false,
      isCanvas: false,
      nodes: [],
      linkedNodes: {},
      props,
    },
  };
};

const getSerializedPDFBlock = (
  block: PdfBlockV1,
  variant: string,
  mainVariant?: string
): Record<string, ExtendedSerializedNode> => {
  const language = mainVariant ?? variant;

  const pdfSchema = block.variants[language];

  const props: ComponentProps<typeof PDFBlock> = {};
  if (pdfSchema.type === 'internal') {
    props.pdfSchema = {
      url: `${config.env.articlesApiUrl}/${pdfSchema.url}`,
      name: pdfSchema.name,
      type: pdfSchema.type,
      id: pdfSchema.id,
      translationStatus: 'draft',
      tenantId: pdfSchema.tenantId,
    };
  } else {
    props.pdfSchema = {
      url: pdfSchema.url,
      name: pdfSchema.name,
      type: pdfSchema.type,
      translationStatus: 'draft',
    };
  }

  return {
    [block.id]: {
      parent: 'dropableRegion',
      id: block.id.toString(),
      position: block.position,
      type: { resolvedName: BlockTypes.PDFBlock },
      displayName: BlockTypes.PDFBlock,
      hidden: false,
      isCanvas: false,
      nodes: [],
      linkedNodes: {},
      props,
    },
  };
};

const getSerializedTaskBlock = (
  block: SimpleTaskBlockV1 | MediaTaskBlockV1,
  variant: string,
  mainVariant?: string
): Record<string, ExtendedSerializedNode> => {
  const language = mainVariant ?? variant;

  const props: ComponentProps<typeof SimpleTask> = {
    audiences: block.audiences,
    isPublic: block.public,
    required: block.required,
    category: block.category,
    deadline: block.deadline ?? undefined,
    description: block.variants[language].description,
    type: block.type,
  };

  return {
    [block.id]: {
      parent: 'dropableRegion',
      id: block.id.toString(),
      position: block.position,
      type: { resolvedName: 'SimpleTask' },
      displayName: 'SimpleTask',
      hidden: false,
      isCanvas: false,
      nodes: [],
      linkedNodes: {},
      props,
    },
  };
};

const getSerializedTextBlock = (
  block: TextBlockV1,
  variant: string,
  mainVariant?: string
): Record<string, ExtendedSerializedNode> => {
  const language = mainVariant ?? variant;
  const props: ComponentProps<typeof TextBlock> = {
    nodes: block.variants[language],
  };

  return {
    [block.id]: {
      parent: 'dropableRegion',
      id: block.id.toString(),
      position: block.position,
      type: { resolvedName: BlockTypes.TextBlock },
      displayName: BlockTypes.TextBlock,
      hidden: false,
      isCanvas: false,
      nodes: [],
      linkedNodes: {},
      props,
    },
  };
};

const getSerializedTitleBlock = (
  variant: string,
  mainVariant?: string,
  article?: Article
): Record<string, ExtendedSerializedNode> => {
  const language = mainVariant ?? variant;
  const props: ComponentProps<typeof TitleBlock> = {
    text: article?.variants[language].title ?? '',
  };

  return {
    ['title']: {
      parent: 'staticBlock',
      id: 'title',
      position: 1,
      type: { resolvedName: BlockTypes.TitleBlock },
      displayName: BlockTypes.TitleBlock,
      hidden: false,
      isCanvas: false,
      nodes: [],
      linkedNodes: {},
      props,
    },
  };
};

const getSerializedCoverImageBlock = (
  variant: string,
  mainVariant?: string,
  article?: Article
): Record<string, ExtendedSerializedNode> => {
  const language = mainVariant ?? variant;
  const props: ComponentProps<typeof CoverImageBlock> = {};

  if (article && article.variants[language].coverImage) {
    props.imageSchema = {
      ...article.variants[language].coverImage,
      url:
        article.variants[language].coverImage.type === 'internal'
          ? `${config.env.articlesApiUrl}/${article.variants[language].coverImage.url}`
          : article.variants[language].coverImage.url,
    };
  }

  return {
    ['coverImage']: {
      parent: 'staticBlock',
      id: 'coverImage',
      position: 0,
      type: { resolvedName: BlockTypes.CoverImageBlock },
      displayName: BlockTypes.CoverImageBlock,
      hidden: false,
      isCanvas: false,
      nodes: [],
      linkedNodes: {},
      props,
    },
  };
};

export { getBlockNodes, getSerializedCoverImageBlock, getSerializedTitleBlock };
export default getBlockNodes;
