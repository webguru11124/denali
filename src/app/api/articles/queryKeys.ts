import { ArticleFilter } from 'app/pages/Articles/context';

export default {
  articles: (page: number, filters: ArticleFilter) => [
    'articles',
    page,
    filters,
  ],
  article: (id: number) => ['article', id],
  file: (id: string, name: string) => ['file', id, name],
};
