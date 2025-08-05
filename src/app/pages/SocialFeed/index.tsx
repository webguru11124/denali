import { Spinner, InfiniteScroll, Feature } from 'app/components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import FeedContainer from './components/FeedContainer';
import EditPostForm from './forms/EditPostForm';
import NewPostForm from './forms/NewPostForm';
import SocialPost from './SocialPost';
import useDelayedSocialPostQuery from './useDelayedSocialPostQuery';
import usePostDeleteMutation from './usePostDeleteMutation';
import useSocialFeedQuery from './useSocialFeedQuery';

const SocialFeed = () => {
  const { data, meta, isLoading, fetchNextPage } = useSocialFeedQuery();
  const { mutate: deletePost } = usePostDeleteMutation();
  const [editablePostID, setEditablePostID] = useState<number | null>(null);
  const { postId } = useParams<{ postId?: string }>();
  const numericSelectedPostId = Number(postId) || undefined;
  const { data: selectedPost, isLoading: isSelectedPostLoading } =
    useDelayedSocialPostQuery(numericSelectedPostId);

  const getPostsToDisplay = () => {
    if (selectedPost) {
      const filteredFeedPosts = (data || []).filter(
        ({ id }) => id !== numericSelectedPostId
      );

      return [selectedPost, ...filteredFeedPosts];
    }

    return data;
  };

  const postsToDisplay = getPostsToDisplay();
  if (!postsToDisplay || isLoading || !meta) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const post = postsToDisplay.find(({ id }) => id === editablePostID);

  return (
    <div className="flex justify-center mt-6 pb-21">
      <FeedContainer>
        <NewPostForm />
        {post && (
          <EditPostForm post={post} onClose={() => setEditablePostID(null)} />
        )}
        {isSelectedPostLoading && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
        <InfiniteScroll
          dataLength={postsToDisplay.length}
          hasMore={meta?.currentPage < meta?.lastPage}
          next={fetchNextPage}
          loader={
            <div className="h-16 flex justify-center">
              <Spinner />
            </div>
          }
        >
          {postsToDisplay.map(
            ({
              id,
              name,
              text,
              avatars,
              timeago,
              replies,
              markdown,
              locationName,
              files,
              applauded,
              applaudCount,
              userId,
            }) => (
              <SocialPost
                onDelete={() => deletePost(id)}
                userId={userId}
                isMarkdown={Boolean(markdown)}
                text={text}
                onDisplayEditModal={() => setEditablePostID(id)}
                userLocation={locationName}
                createdAt={timeago}
                key={String(id)}
                files={files}
                id={id}
                likedByMe={applauded}
                profileImage={avatars.small}
                name={name}
                replies={replies}
                likesCount={applaudCount}
              />
            )
          )}
        </InfiniteScroll>
      </FeedContainer>
    </div>
  );
};

const FeaturedSocialFeed = () => (
  <Feature feature="social" activeComponent={SocialFeed} />
);

export default FeaturedSocialFeed;
