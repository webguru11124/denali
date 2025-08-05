import { cx, css } from '@emotion/css';
import styled from '@emotion/styled';
import { WikiArticleProps } from 'app/api/wiki/types';
import {
  TypedIconButton,
  HtmlContent,
  FileButton,
  HideableContent,
  Container,
  LinkButton,
  PageLoader,
} from 'app/components';
import config from 'app/config';
import { useScreenBreakpoint, useControlledTranslations } from 'app/hooks';
import { createSrcSet } from 'app/utils';
import { FC } from 'react';

import { resolveExcerptWidth } from '../utils';

import WikiButtonImage from './WikiButtonImage';
import WikiCard from './WikiCard';

const Header = styled.div`
  height: 280px;
`;

interface Props {
  article: WikiArticleProps;
  isTranslated: boolean;
  onTranslationToggle: () => void;
}

const WikiArticle: FC<Props> = ({
  article,
  isTranslated,
  onTranslationToggle,
}) => {
  const breakpoint = useScreenBreakpoint();

  const {
    translations: [articleTitle, articleContent],
    isTranslating,
  } = useControlledTranslations({
    texts: [article.title, article.content],
    isTranslated,
  });

  const hasIcons = Boolean(article.iconSizes);

  return (
    <div className="flex justify-center">
      <Container
        className={cx(
          'xl:mt-8',
          css`
            @media (max-width: ${config.screenSizes.lg}) {
              width: 100vw !important;
            }
          `
        )}
      >
        <div className="w-full">
          <div className="w-full">
            <div className="xl:rounded-lg xl:shadow-atobi mb-14">
              <HideableContent maxHeight={500}>
                <Header
                  className={cx(
                    'xl:rounded-t-lg flex items-center justify-center',
                    {
                      'bg-secondary': !hasIcons,
                    }
                  )}
                >
                  <WikiButtonImage
                    imageClassName="w-full h-full xl:rounded-t-lg "
                    iconClassName="w-16 h-16"
                    src={article.icon}
                    srcSet={
                      article.iconSizes && createSrcSet(article.iconSizes)
                    }
                    hasChild={!!article.children.length}
                  />
                </Header>
                {isTranslating ? (
                  <PageLoader />
                ) : (
                  <>
                    <div className=" pb-6">
                      <div className="flex px-12">
                        <p className="text-lg mt-8">{articleTitle}</p>
                        <TypedIconButton
                          onClick={onTranslationToggle}
                          isActive={isTranslated}
                          isLoading={isTranslating}
                          variant="translate"
                          className="ml-auto"
                        />
                      </div>
                      <div className="mt-4">
                        <HideableContent
                          isCollapsable={Boolean(
                            article.children.length &&
                              !['2xl', 'xl'].includes(breakpoint)
                          )}
                          maxHeight={264}
                        >
                          <div className="px-12">
                            <HtmlContent
                              content={articleContent}
                              isMarkdown={article.markdown}
                            />
                            <div className="row mt-6">
                              {article.links.map(({ url, title }) => (
                                <div className="col-6">
                                  <LinkButton to={url} label={title} />
                                </div>
                              ))}
                            </div>
                            <div className="row mt-6">
                              {article.files.map(
                                ({ id: fileId, fileName, type, url }) => (
                                  <div className="col-6">
                                    <FileButton
                                      url={url}
                                      key={fileId}
                                      className="w-full mb-2"
                                      name={fileName}
                                      type={type}
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </HideableContent>
                      </div>
                    </div>
                  </>
                )}
              </HideableContent>
            </div>
          </div>
        </div>
        <div className="pb-6">
          <div className="row">
            {article.children.map((child) => (
              <div className="2xl:col-3 col-4 mb-4" key={child.id}>
                <WikiCard className="mb-0" article={child} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WikiArticle;
