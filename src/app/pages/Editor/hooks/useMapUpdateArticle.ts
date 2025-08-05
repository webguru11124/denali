import { Node } from '@craftjs/core/lib/interfaces/nodes';
import { selectors } from 'app/store/editor';
import {
  Article,
  TextBlock,
  UrlBlock,
  ImageBlock,
  VideoBlock,
  UpdatedArticle,
  UpdatedBlock,
  UrlBlockVariants,
  ImageBlockVariants,
  TextBlockVariants,
  VideoBlockVariants,
  CoverImageFile,
  ArticleVariant,
  PdfBlock,
  PdfBlockVariants,
  SimpleTaskBlockVariants,
  MediaTaskBlockVariants,
  SimpleTaskBlock,
  MediaTaskBlock,
} from 'common-ui/generated/api/gcs';
import { useSelector } from 'react-redux';

import BlockTypes from '../helpers/constants';

const useMapUpdateArticle = () => {
  const selectedLanguages = useSelector(selectors.getSelectedLanguages);
  const selectedAudiences = useSelector(selectors.getSelectedAudiences);
  const selectedCollaborators = useSelector(selectors.getSelecteCollaborators);
  const selectedChannel = useSelector(selectors.getSelectedChannel);
  const selectedLanguage = useSelector(selectors.getActiveLanguage);
  const mainLanguage =
    selectedLanguages.find((sl) => sl.isDefault)?.code ?? 'en';

  const nodesToUpdateArticle = (
    article: Article,
    nodes: Record<string, Node>
  ): UpdatedArticle => {
    const blockIds = nodes['dropableRegion'].data.nodes;

    const blocks: UpdatedBlock[] = [];

    blockIds.forEach((blockId, index) => {
      const apiBlock = article.blocks.find((b) => b.id.toString() === blockId);
      const block = nodes[blockId];
      switch (block.data.displayName) {
        case BlockTypes.TextBlock:
          if (!block.data.props.nodes) return;
          blocks.push(
            buildTextBlockObject(block, index, article, apiBlock?.id)
          );
          break;
        case BlockTypes.UrlBlock:
          if (!block.data.props.url) return;
          blocks.push(buildUrlBlockObject(block, index, article, apiBlock?.id));
          break;
        case BlockTypes.ImageBlock:
          if (!block.data.props.imageSchema) return;
          blocks.push(
            buildImageBlockObject(block, index, article, apiBlock?.id)
          );
          break;
        case BlockTypes.VideoBlock:
          if (!block.data.props.videoSchema) return;
          blocks.push(
            buildVideoBlockObject(block, index, article, apiBlock?.id)
          );
          break;
        case BlockTypes.GiphyBlock:
          if (!block.data.props.imageSchema) return;
          blocks.push(
            buildGiphyBlockObject(block, index, article, apiBlock?.id)
          );
          break;
        case BlockTypes.PDFBlock:
          if (!block.data.props.pdfSchema) return;
          blocks.push(buildPdfBlockObject(block, index, article, apiBlock?.id));
          break;
        case 'SimpleTask':
          if (!block.data.props.description) return;
          blocks.push(
            buildTaskBlockObject(block, index, article, apiBlock?.id)
          );
          break;
        default:
          break;
      }
    });

    const coverImage = nodes['coverImage'].data.props.imageSchema;
    const title = nodes['title'].data.props.text;

    const variants = {
      ...article.variants,
      ...buildOuterVariantObject(title, coverImage),
    };

    const updatedArticle: UpdatedArticle = {
      id: article.id,
      channelId: selectedChannel?.id ?? null,
      variants,
      blocks,
      status: article.status,
      publishAt: article.publishAt,
      archiveAt: article.archiveAt,
      audiences: selectedAudiences.map((sa) => {
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

    const withSyncedBlocks = syncBlocks(updatedArticle);

    return withSyncedBlocks;
  };

  const buildOuterVariantObject = (
    title: string,
    coverImage: CoverImageFile
  ): { [key: string]: ArticleVariant } => {
    return {
      [selectedLanguage]: {
        title,
        coverImage,
        translationStatus: 'draft',
      },
    };
  };

  const buildTextBlockObject = (
    block: Node,
    index: number,
    article: Article,
    blockId?: number | undefined
  ): TextBlock => {
    let variants: TextBlockVariants = {};

    if (blockId) {
      article.blocks.forEach((b) => {
        if (b.id === blockId) {
          variants = b.variants as TextBlockVariants;
        }
      });
    }

    return {
      id: blockId,
      version: 1,
      parentId: Number(block.data.parent),
      type: 'text',
      position: index,
      variants: {
        ...(variants && variants),
        [selectedLanguage]: block.data.props.nodes,
      },
    };
  };

  const buildUrlBlockObject = (
    block: Node,
    index: number,
    article: Article,
    blockId?: number | undefined
  ): UrlBlock => {
    let variants: UrlBlockVariants = {};

    if (blockId) {
      article.blocks.forEach((b) => {
        if (b.id === blockId) {
          variants = b.variants as UrlBlockVariants;
        }
      });
    }
    return {
      id: blockId,
      version: 1,
      parentId: Number(block.data.parent),
      position: index,
      type: 'url',
      variants: {
        ...(variants && variants),
        [selectedLanguage]: {
          name: block.data.props.name ?? '',
          url: block.data.props.url,
          openIn: block.data.props.openIn ?? 'new-window',
          translationStatus: 'draft',
        },
      },
    };
  };

  const buildImageBlockObject = (
    block: Node,
    index: number,
    article: Article,
    blockId?: number | undefined
  ): ImageBlock => {
    let variants: ImageBlockVariants = {};

    if (blockId) {
      article.blocks.forEach((b) => {
        if (b.id === blockId) {
          variants = b.variants as ImageBlockVariants;
        }
      });
    }

    return {
      id: blockId,
      version: 1,
      parentId: Number(block.data.parent),
      position: index,
      type: 'image',
      variants: {
        ...(variants && variants),
        [selectedLanguage]: {
          name: block.data.props.imageSchema.name,
          type: block.data.props.imageSchema.type,
          url: block.data.props.imageSchema.url,
          id: block.data.props.imageSchema.id,
          tenantId: block.data.props.imageSchema.tenantId ?? null,
          translationStatus: 'draft',
        },
      },
    };
  };

  const buildVideoBlockObject = (
    block: Node,
    index: number,
    article: Article,
    blockId?: number | undefined
  ): VideoBlock => {
    let variants: VideoBlockVariants = {};
    if (blockId) {
      article.blocks.forEach((b) => {
        if (b.id === blockId) {
          variants = b.variants as VideoBlockVariants;
        }
      });
    }
    return {
      id: blockId,
      version: 1,
      parentId: Number(block.data.parent),
      position: index,
      type: 'video',
      variants: {
        ...(variants && variants),
        [selectedLanguage]: {
          type: block.data.props.videoSchema.type,
          name: block.data.props.videoSchema.name,
          url: block.data.props.videoSchema.url,
          id: block.data.props.videoSchema.id,
          tenantId: block.data.props.videoSchema.tenantId ?? null,
          translationStatus: 'draft',
        },
      },
    };
  };

  const buildGiphyBlockObject = (
    block: Node,
    index: number,
    article: Article,
    blockId?: number | undefined
  ): ImageBlock => {
    let variants: ImageBlockVariants = {};
    if (blockId) {
      article.blocks.forEach((b) => {
        if (b.id === blockId) {
          variants = b.variants as ImageBlockVariants;
        }
      });
    }
    return {
      id: blockId,
      version: 1,
      parentId: Number(block.data.parent),
      position: index,
      type: 'image',
      variants: {
        ...(variants && variants),
        [selectedLanguage]: {
          name: block.data.props.imageSchema.name,
          type: 'external',
          url: block.data.props.imageSchema.url,
          translationStatus: 'draft',
        },
      },
    };
  };

  const buildPdfBlockObject = (
    block: Node,
    index: number,
    article: Article,
    blockId?: number | undefined
  ): PdfBlock => {
    let variants: PdfBlockVariants = {};
    if (blockId) {
      article.blocks.forEach((b) => {
        if (b.id === blockId) {
          variants = b.variants as PdfBlockVariants;
        }
      });
    }
    return {
      id: blockId,
      version: 1,
      parentId: Number(block.data.parent),
      position: index,
      type: 'pdf',
      variants: {
        ...(variants && variants),
        [selectedLanguage]: {
          type: block.data.props.pdfSchema.type,
          name: block.data.props.pdfSchema.name,
          url: block.data.props.pdfSchema.url,
          id: block.data.props.pdfSchema.id,
          tenantId: block.data.props.pdfSchema.tenantId ?? null,
          translationStatus: 'draft',
        },
      },
    };
  };

  const buildTaskBlockObject = (
    block: Node,
    index: number,
    article: Article,
    blockId?: number | undefined
  ): SimpleTaskBlock | MediaTaskBlock => {
    let variants: SimpleTaskBlockVariants | MediaTaskBlockVariants = {};

    if (blockId) {
      article.blocks.forEach((b) => {
        if (b.id === blockId) {
          variants =
            block.data.props.type === 'simple_task'
              ? (b.variants as SimpleTaskBlockVariants)
              : (b.variants as MediaTaskBlockVariants);
        }
      });
    }

    return {
      id: blockId,
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
        ...(variants && variants),
        [selectedLanguage]: {
          description: block.data.props.description,
          translationStatus: 'draft',
        },
      },
    };
  };

  const syncBlocks = (updatedArticle: UpdatedArticle): UpdatedArticle => {
    if (!mainLanguage) return updatedArticle;

    const selectedLanguageCodes = selectedLanguages
      .map((sl) => sl.code)
      .filter((code) => code !== mainLanguage);

    const withSyncedBlocks = updatedArticle;

    const variants = Array.from(Object.keys(updatedArticle.variants));

    const variantsToRemove = variants.filter((element) => {
      return ![...selectedLanguageCodes, mainLanguage].includes(element);
    });

    variantsToRemove.forEach((tr) => {
      delete updatedArticle.variants[tr];
      updatedArticle.blocks.forEach((b) => delete b.variants[tr]);
    });

    selectedLanguageCodes.forEach((c) => {
      if (!updatedArticle.variants[c]) {
        withSyncedBlocks.variants[c] = updatedArticle.variants[mainLanguage];
      }

      updatedArticle.blocks.forEach((block, i) => {
        if (!block.variants[c]) {
          withSyncedBlocks.blocks[i].variants[c] = block.variants[mainLanguage];
        }
      });
    });

    return withSyncedBlocks;
  };

  return {
    nodesToUpdateArticle,
  };
};

export default useMapUpdateArticle;
