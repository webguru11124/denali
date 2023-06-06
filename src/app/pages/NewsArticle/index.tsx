import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { ComplaintTypes } from 'app/api/complaints/constants';
import { useNewsArticleQuery } from 'app/api/news/hooks';
import BlockingContext from 'app/blockings/context';
import {
  PageLoader,
  Avatar,
  TypedIconButton,
  HtmlContent,
  Container,
  FormattedDate,
  Gallery,
  LinkButton,
  Feature,
  RequestError,
  ComplaintsPopup,
} from 'app/components';
import { useRouteId, useTranslations } from 'app/hooks';
import {
  useCommonTranslation,
  useNewsTranslation,
} from 'app/internationalization/hooks';
import { routes } from 'app/router';
import { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CommentIcon from 'remixicon-react/Chat1LineIcon';
import EyeLineIcon from 'remixicon-react/EyeLineIcon';

import ArticleQuiz from './ArticleQuiz';
import Comments from './Comments';
import useArticleLikeMutation from './useArticleLikeMutation';
import ViewsModal from './ViewsModal';

const NewsArticle = () => {
  const id = useRouteId();
  if (typeof id === 'string') throw new Error('Article ID should be numeric');
  const { t: tCommon } = useCommonTranslation();
  const { t: tNews } = useNewsTranslation();
  const [shouldDisplayViewsModal, setShouldDisplayViewsModal] = useState(false);
  const { data: user } = useAuthenticatedUser();
  const { mutate: likeArticle, isLoading: isLikeLoading } =
    useArticleLikeMutation(id);
  const { data, isLoading, error } = useNewsArticleQuery(id);

  const { isHiddenOrBlocked } = useContext(BlockingContext);

  const isHidden = useMemo(
    () =>
      data
        ? isHiddenOrBlocked(id, data.createdById, ComplaintTypes.newsFeed)
        : false,
    [id, data, isHiddenOrBlocked]
  );

  const {
    translations: [translatedTitle, translatedDescription],
    isTranslating,
    isTranslated,
    toggleTranslation,
  } = useTranslations([data?.title ?? '', data?.description ?? '']);

  if (error) {
    return <RequestError error={error} />;
  }

  if (!data || isLoading) {
    return <PageLoader />;
  }

  const files = data.files.concat(data.pictures);

  return (
    <div className="container mx-auto mt-8">
      {shouldDisplayViewsModal && (
        <ViewsModal
          articleId={id}
          onClose={() => setShouldDisplayViewsModal(false)}
        />
      )}
      <div className="flex flex-col items-center">
        <Container className="shadow-atobi p-6 rounded-lg mb-8">
          <div className="flex">
            <div className="flex">
              <Avatar
                src={data.createdByAvatars.small}
                alt={`${data.createdByName} avatar`}
                id={data.createdById}
              />
              <div className="ml-3">
                <Link
                  to={routes.user.create(data.createdById)}
                  className="font-bold text-sm whitespace-nowrap text-grayscale-primary"
                >
                  By {data.createdByName}
                </Link>
                <div className="text-sm text-grayscale-secondary">
                  {data.createdAt ? (
                    <FormattedDate date={data.createdAt} />
                  ) : null}
                </div>
              </div>
            </div>
            {user?.id === data.createdById ? (
              <TypedIconButton
                onClick={toggleTranslation}
                isActive={isTranslated}
                isLoading={isTranslating}
                variant="translate"
                className="ml-auto"
              />
            ) : (
              <div className="ml-auto">
                {!isHidden && (
                  <ComplaintsPopup
                    creatorName={data.createdByName}
                    creatorUserId={data.createdById}
                    complaintObjectId={id}
                    complaintType={ComplaintTypes.newsFeed}
                    onTranslate={toggleTranslation}
                    isLoading={isLoading}
                    isTranslated={isTranslated}
                  />
                )}
              </div>
            )}
          </div>
          <div className="px-12">
            <div className="mt-4">
              <h1 className="text-lg font-bold text-grayscale-primary">
                {translatedTitle}
              </h1>
              {isHidden ? (
                <div className="text-grayscale-secondary mt-2">
                  {tCommon('This post has been hidden.')}
                </div>
              ) : (
                <div className="text-grayscale-primary mt-2">
                  <HtmlContent
                    isMarkdown={data.markdown}
                    content={translatedDescription}
                  />
                </div>
              )}
            </div>
            <div>
              <div className="row mt-3">
                {!isHidden &&
                  data.links.map(({ url, title }) => (
                    <div className="col-6">
                      <LinkButton to={url} label={title} />
                    </div>
                  ))}
              </div>
            </div>
            {!isHidden && data?.files && (
              <div className="mt-3">
                <Gallery files={files} />
              </div>
            )}
            {!isHidden && data.poll && (
              <>
                <ArticleQuiz
                  articleId={id}
                  isExpired={data.isExpired}
                  votedAnswerId={data.poll.mySelectedAnswerId}
                  pollId={data.poll.id}
                  answers={data.poll.answers}
                  votedByMe={Boolean(data.poll.votedByMe)}
                />
                <span className="text-xs text-grayscale-secondary">
                  {tNews('{{totalVotes}} people have voted', {
                    totalVotes: data.poll.totalVoteCount,
                  })}
                </span>
              </>
            )}
          </div>
          <div className="pl-10 pr-12 mt-4">
            <div className="mt-6 ml-2 text-xs flex justify-between px-4 border-t border-b border-gray-light py-3 text-grayscale-secondary">
              <div className="flex">
                <TypedIconButton
                  onClick={() => likeArticle()}
                  isActive={data.likedByMe}
                  isLoading={isLikeLoading}
                  variant="like"
                  className="flex items-center"
                >
                  <span className="ml-2">
                    {tCommon('Reaction', {
                      count: data.totalUsersLike,
                    })}
                  </span>
                </TypedIconButton>
              </div>
              <div className="flex items-center">
                <CommentIcon className="mr-2" />
                {tCommon('Comment', {
                  count: data.commentsCount,
                })}
              </div>
              <button
                type="button"
                onClick={() => setShouldDisplayViewsModal(true)}
                className="flex items-center"
              >
                <EyeLineIcon className="mr-2" />
                {tCommon('View', {
                  count: data.totalUsersSeen,
                })}
              </button>
              <TypedIconButton
                onClick={toggleTranslation}
                isActive={isTranslated}
                isLoading={isTranslating}
                variant="translate"
                className=""
              />
            </div>
            <Comments id={id} />
          </div>
        </Container>
      </div>
    </div>
  );
};

const FeaturedNewsArticle = () => (
  <Feature feature="news" activeComponent={NewsArticle} />
);

export default FeaturedNewsArticle;
