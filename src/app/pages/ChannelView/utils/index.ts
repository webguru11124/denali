import { BasicArticleInfo } from 'submodules/common-ui/generated/api/gcs';

const divideArray = (articles: BasicArticleInfo[] = []) => {
  let i = 0;
  const columns: { [x: string]: BasicArticleInfo[] } = {
    0: [],
    1: [],
    2: [],
  };
  for (const article of articles) {
    columns[i].push(article);
    if (i >= 0 && i <= 1) {
      i++;
    } else {
      i = 0;
    }
  }
  return columns;
};

export { divideArray };
export default divideArray;
