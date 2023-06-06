import { Node } from '@craftjs/core/lib/interfaces/nodes';
import { selectors } from 'app/store/editor';
import {
  NewArticle,
  NewTextBlock,
  NewBlock,
  NewUrlBlock,
  NewImageBlock,
  NewVideoBlock,
  CoverImageFile,
  ArticleVariant,
  NewPdfBlock,
  NewSimpleTaskBlock,
  NewMediaTaskBlock,
} from 'common-ui/generated/api/gcs';
import { useSelector } from 'react-redux';

import BlockTypes from '../helpers/constants';

const useMapNewArticle = (nodes: Record<string, Node>) => {
  const selectedLanguages = useSelector(selectors.getSelectedLanguages);
  const selectedAudiences = useSelector(selectors.getSelectedAudiences);
  const selectedChannel = useSelector(selectors.getSelectedChannel);
  const selectedCollaborators = useSelector(selectors.getSelecteCollaborators);
  const mainLanguage =
    selectedLanguages.find((sl) => sl.isDefault)?.code || 'en';

  const nodesToNewArticle = (): NewArticle => {
    const blockIds = nodes['dropableRegion'].data.nodes;

    const blocks: NewBlock[] = [];

    blockIds.forEach((blockId, index) => {
      const block = nodes[blockId];
      switch (block.data.displayName) {
        case BlockTypes.TextBlock:
          if (!block.data.props.nodes) return;
          blocks.push(buildTextBlockObject(block, index));
          break;
        case BlockTypes.UrlBlock:
          if (!block.data.props.url) return;
          blocks.push(buildUrlBlockObject(block, index));
          break;
        case BlockTypes.ImageBlock:
          if (!block.data.props.imageSchema) return;
          blocks.push(buildImageBlockObject(block, index));
          break;
        case BlockTypes.VideoBlock:
          if (!block.data.props.videoSchema) return;
          blocks.push(buildVideoBlockObject(block, index));
          break;
        case BlockTypes.GiphyBlock:
          if (!block.data.props.imageSchema) return;
          blocks.push(buildGiphyBlockObject(block, index));
          break;
        case BlockTypes.PDFBlock:
          if (!block.data.props.pdfSchema) return;
          blocks.push(buildPdfBlockObject(block, index));
          break;
        case 'SimpleTask':
          if (!block.data.props.description) return;
          blocks.push(buildSimpleTaskBlockObject(block, index));
          break;
        default:
          break;
      }
    });

    const coverImage = nodes['coverImage'].data.props.imageSchema;
    const title = nodes['title'].data.props.text || 'Untitled';
    const variants = buildOuterVariantObject(title, coverImage);

    const article: NewArticle = {
      variants,
      blocks,
      status: 'draft',
      channelId: selectedChannel?.id ?? null,
      publishAt: null,
      archiveAt: null,
      audiences: selectedAudiences.map((sa): number => {
        return sa.id;
      }),
      languages: selectedLanguages.map((sl) => {
        return { language: sl.code, isDefault: sl.isDefault };
      }),
      users: selectedCollaborators.map((sc) => {
        return {
          id: sc.id,
          languages: sc.languages,
        };
      }),
    };

    const withSyncedBlocks = syncBlocks(article);

    return withSyncedBlocks;
  };

  const buildOuterVariantObject = (
    title: string,
    coverImage: CoverImageFile
  ): { [key: string]: ArticleVariant } => {
    return {
      [mainLanguage]: {
        title,
        coverImage,
        translationStatus: 'draft',
      },
    };
  };

  const buildTextBlockObject = (block: Node, index: number): NewTextBlock => {
    return {
      version: 1,
      parentId: Number(block.data.parent),
      type: 'text',
      position: index,
      variants: {
        [mainLanguage]: block.data.props.nodes,
      },
    };
  };

  const buildUrlBlockObject = (block: Node, index: number): NewUrlBlock => {
    return {
      version: 1,
      parentId: Number(block.data.parent),
      position: index,
      type: 'url',
      variants: {
        [mainLanguage]: {
          name: block.data.props.name ?? '',
          url: block.data.props.url,
          openIn: block.data.props.openIn ?? 'new-window',
          translationStatus: 'draft',
        },
      },
    };
  };

  const buildImageBlockObject = (block: Node, index: number): NewImageBlock => {
    return {
      version: 1,
      parentId: Number(block.data.parent),
      position: index,
      type: 'image',
      variants: {
        [mainLanguage]: {
          name: block.data.props.imageSchema.name,
          type: block.data.props.imageSchema.type,
          url: block.data.props.imageSchema.url,
          id: block.data.props.imageSchema.id,
          translationStatus: 'draft',
        },
      },
    };
  };

  const buildGiphyBlockObject = (block: Node, index: number): NewImageBlock => {
    return {
      version: 1,
      parentId: Number(block.data.parent),
      position: index,
      type: 'image',
      variants: {
        [mainLanguage]: {
          name: block.data.props.imageSchema.name,
          type: 'external',
          url: block.data.props.imageSchema.url,
          translationStatus: 'draft',
        },
      },
    };
  };

  const buildVideoBlockObject = (block: Node, index: number): NewVideoBlock => {
    return {
      version: 1,
      parentId: Number(block.data.parent),
      position: index,
      type: 'video',
      variants: {
        [mainLanguage]: {
          type: block.data.props.videoSchema.type,
          name: block.data.props.videoSchema.name,
          url: block.data.props.videoSchema.url,
          id: block.data.props.videoSchema.id,
          translationStatus: 'draft',
        },
      },
    };
  };

  const buildPdfBlockObject = (block: Node, index: number): NewPdfBlock => {
    return {
      version: 1,
      parentId: Number(block.data.parent),
      position: index,
      type: 'pdf',
      variants: {
        [mainLanguage]: {
          type: block.data.props.pdfSchema.type,
          name: block.data.props.pdfSchema.name,
          url: block.data.props.pdfSchema.url,
          id: block.data.props.pdfSchema.id,
          translationStatus: 'draft',
        },
      },
    };
  };

  const buildSimpleTaskBlockObject = (
    block: Node,
    index: number
  ): NewSimpleTaskBlock | NewMediaTaskBlock => {
    return {
      version: 1,
      parentId: Number(block.data.parent),
      position: index,
      type: block.data.props.type,
      category: block.data.props.category ?? null,
      deadline: block.data.props.deadline ?? null,
      required: block.data.props.required,
      public: block.data.props.isPublic,
      audiences: block.data.props.audiences,
      variants: {
        [mainLanguage]: {
          description: block.data.props.description,
          translationStatus: 'draft',
        },
      },
    };
  };

  const syncBlocks = (article: NewArticle): NewArticle => {
    if (!mainLanguage) return article;

    const selectedLanguageCodes = selectedLanguages
      .map((sl) => sl.code)
      .filter((code) => code !== mainLanguage);

    const withSyncedBlocks = article;

    selectedLanguageCodes.forEach((code) => {
      article.blocks.forEach((block, i) => {
        if (!block.variants[code]) {
          withSyncedBlocks.blocks[i].variants[code] =
            block.variants[mainLanguage];
        }
      });
    });

    return withSyncedBlocks;
  };

  return {
    nodesToNewArticle,
  };
};

export default useMapNewArticle;
