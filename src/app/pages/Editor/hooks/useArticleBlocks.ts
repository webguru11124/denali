import { SerializedNode } from '@craftjs/core/lib/interfaces/nodes';
import { selectors } from 'app/store/editor';
import {
  dropableRegionBlock,
  rootBlock,
  staticBlock,
} from 'app/utils/createCraftBlocks';
import sortBy from 'lodash/sortBy';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Article } from 'submodules/common-ui/generated/api/gcs/api';

import {
  getSerializedCoverImageBlock,
  getSerializedTitleBlock,
  getBlockNodes,
} from '../helpers/apiToCraft';

const useArticleBlocks = (
  mainLanguage: string,
  article?: Article | undefined
) => {
  const selectedLanguage = useSelector(selectors.getActiveLanguage);

  const blocks = useMemo(() => {
    const userBlocks = article?.blocks.reduce<
      Record<string, SerializedNode & { id: string; position: number }>
    >(
      (accumulator, block) => ({
        ...accumulator,
        ...getBlockNodes(
          block,
          selectedLanguage,
          !block.variants[selectedLanguage] ? mainLanguage : undefined
        ),
      }),
      {}
    );

    const nodes = userBlocks
      ? sortBy(
          Object.values(userBlocks).filter((block) => block),
          (o) => o.position
        ).map((o) => o.id)
      : undefined;

    const articleMainLanguage =
      article?.languages.filter((l) => l.isDefault)[0].language || 'en';

    const mainVariant = article?.variants[selectedLanguage]
      ? undefined
      : article?.variants[mainLanguage]
      ? mainLanguage
      : articleMainLanguage;

    return {
      ROOT: rootBlock({ className: 'flex flex-col h-full' }),
      staticBlock: staticBlock(['coverImage', 'title']),
      ...getSerializedCoverImageBlock(selectedLanguage, mainVariant, article),
      ...getSerializedTitleBlock(selectedLanguage, mainVariant, article),
      dropableRegion: dropableRegionBlock(nodes, {
        className: 'flex flex-col h-full min-h-[100px] pb-4 px-2',
      }),
      ...userBlocks,
    };
  }, [article, selectedLanguage, mainLanguage]);

  return {
    blocks,
    article,
  };
};

export default useArticleBlocks;
