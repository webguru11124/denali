import TabIndicator from 'app/components/TabIndicator';
import { useDispatch } from 'app/hooks';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { actions, selectors } from 'app/store/common';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BasicArticleInfoStatusEnum } from 'submodules/common-ui/generated/api/gcs';

import { useArticlesContext } from '../context';

type TabKeys = Exclude<BasicArticleInfoStatusEnum, 'rejected'>;

const ArticleTabsIndicatorContainer = () => {
  const { setArticleFilters, setSelectedArticles, articleFilters } =
    useArticlesContext();
  const { t } = useArticlesTranslation();

  const dispatch = useDispatch();
  const articleTab = useSelector(selectors.getArticlesTab);

  const tabs: { [key in TabKeys]: string } = {
    draft: t('Draft'),
    published: t('Live'),
    inbound: t('Scheduled'),
    archived: t('Archive'),
  };

  useEffect(() => {
    if (!articleTab) return;

    setArticleFilters((prev) => {
      return { ...prev, status: articleTab };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex">
      {Object.keys(tabs).map((key, index) => {
        const newKey = key as TabKeys;
        return (
          <TabIndicator
            key={index}
            label={tabs[newKey]}
            selected={newKey === articleFilters.status}
            onClick={() => {
              dispatch(actions.setArticlesTab(newKey));
              setArticleFilters((prev) => {
                return { ...prev, status: newKey };
              });
              setSelectedArticles([]);
            }}
          />
        );
      })}
    </div>
  );
};

export default ArticleTabsIndicatorContainer;
