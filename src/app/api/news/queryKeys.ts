export default {
  newsArticle: (id: number) => ['news-article', id],
  categories: () => ['categories'],
  relevant: (searchQuery: string, category: string) => [
    'news-relevant',
    searchQuery,
    category,
  ],
  expired: (searchQuery: string, category: string) => [
    'news-expired',
    searchQuery,
    category,
  ],
  unseenAmount: () => ['news-relevant-count'],
  articleComments: (articleId: number) => ['news-article-comments', articleId],
  articleSeenTeams: (articleId: number) => [
    'news-article-seen-teams',
    articleId,
  ],
  articleSeenUsers: (articleId: number) => [
    'news-article-seen-users',
    articleId,
  ],
  seenLocation: (articleId: number, locationId: number) => [
    'news-article-seen-location',
    articleId,
    locationId,
  ],
};
