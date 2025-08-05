import { cx } from '@emotion/css';
import { Checkbox, VerticalChevron, FilterDropdown } from 'app/components';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { ChangeEvent, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { BasicChannelInfo } from 'submodules/common-ui/generated/api/gcs';

import { ArticleFilter, SortValues, useArticlesContext } from '../../context';
import CheckItemsDropdown from '../dropdowns/CheckItemsDropdown';
import SortDropdown from '../dropdowns/SortDropdown';

interface ArticleTableHeadItemProps {
  icon?: string;
  text: string;
  margin?: boolean;
  tabName?: 'channel';
  checkboxChangeHandler?: () => void;
}

const ArticleTableHeadItem = ({
  icon,
  text,
  margin,
  tabName,
  checkboxChangeHandler,
}: ArticleTableHeadItemProps) => {
  const {
    articleFilters,
    setArticleFilters,
    user,
    selectedArticles,
    setSelectedChannels,
    selectedChannels,
    channels,
  } = useArticlesContext();
  const [open, setOpen] = useState(false);
  const { t } = useArticlesTranslation();

  const filterDropdownItems = [
    {
      text: t('All articles'),
      checked: !articleFilters.createdBy,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setArticleFilters((rest) => {
          return {
            ...rest,
            createdBy: undefined,
          };
        });
      },
    },
    {
      text: t('Created by me'),
      checked: articleFilters.createdBy !== undefined,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setArticleFilters((rest) => {
          return {
            ...rest,
            createdBy: user?.id,
          };
        });
      },
    },
  ];

  const gertSortValue = (value: SortValues | undefined): 'asc' | 'desc' => {
    return !value ? 'asc' : value === 'asc' ? 'desc' : 'asc';
  };

  const onChange = (channel: BasicChannelInfo, checked: boolean) => {
    setSelectedChannels((oldState) => {
      let newState = oldState;
      if (checked) {
        newState = [...oldState, channel];
      } else {
        newState = oldState.filter((e) => e.id !== channel.id);
      }

      setArticleFilters((prev) => {
        const channelId = String(newState.map((e) => e.id));
        const state: ArticleFilter = {
          ...prev,
          channelId,
        };
        if (!channelId) delete state.channelId;
        return state;
      });

      return newState;
    });
  };

  const onReset = () => {
    setSelectedChannels([]);
    setArticleFilters((prev) => {
      return {
        ...prev,
        channelId: undefined,
      };
    });
  };

  const draftArticlesSortOptions = [
    {
      text: 'Recently Updated',
      onClick: () =>
        setArticleFilters((prev) => {
          return {
            ...prev,
            createdAt: gertSortValue(prev.createdAt),
          };
        }),
    },
    {
      text: 'Publish Date',
      onClick: () =>
        setArticleFilters((prev) => {
          return {
            ...prev,
            publishedAt: gertSortValue(prev.publishedAt),
          };
        }),
    },
    {
      text: 'Archive Date',
      onClick: () =>
        setArticleFilters((prev) => {
          return {
            ...prev,
            archivedAt: gertSortValue(prev.archivedAt),
          };
        }),
    },
  ];

  const publishedArticlesSortOptions = [
    {
      text: 'Newest to Oldest',
      onClick: () =>
        setArticleFilters((prev) => {
          return {
            ...prev,
            publishedAt: 'desc',
          };
        }),
    },
    {
      text: 'Oldest to Newest',
      onClick: () =>
        setArticleFilters((prev) => {
          return {
            ...prev,
            publishedAt: 'asc',
          };
        }),
    },
  ];

  const archivedAtArticlesSortOptions = [
    {
      text: 'Newest to Oldest',
      onClick: () =>
        setArticleFilters((prev) => {
          return {
            ...prev,
            archivedAt: 'desc',
          };
        }),
    },
    {
      text: 'Oldest to Newest',
      onClick: () =>
        setArticleFilters((prev) => {
          return {
            ...prev,
            archivedAt: 'asc',
          };
        }),
    },
  ];

  const renderDropdownItems = () => {
    if (tabName === 'channel') {
      return (
        <CheckItemsDropdown
          onChange={onChange}
          channels={channels}
          selectedChannels={selectedChannels}
          onReset={onReset}
        />
      );
    } else return <SortDropdown items={getSortDropdownItems()} />;
  };

  const getSortDropdownItems = () => {
    const { status } = articleFilters;

    switch (status) {
      case 'draft':
        return draftArticlesSortOptions;
      case 'archived':
        return archivedAtArticlesSortOptions;
      case 'published':
      case 'inbound':
        return publishedArticlesSortOptions;
      default:
        break;
    }
  };

  return (
    <th
      className={cx({
        'w-6/12 pl-3': checkboxChangeHandler !== undefined,
      })}
    >
      <div className="flex items-center justify-start mb-4">
        {checkboxChangeHandler && (
          <Checkbox
            id={text}
            onChange={checkboxChangeHandler}
            checked={selectedArticles.length > 0}
          />
        )}

        <label
          className={cx('text-sm font-normal text-grayscale-secondary', {
            'ml-4': margin,
          })}
        >
          {checkboxChangeHandler && selectedArticles.length > 0
            ? `${t('articleWithCount', {
                count: selectedArticles.length,
              })}`
            : text}
        </label>
        {icon ? (
          <button onClick={() => null}>
            <img src={icon} alt="" />
          </button>
        ) : (
          <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
            <div className="relative flex">
              <VerticalChevron
                onClick={() => setOpen((isOpen) => !isOpen)}
                open={open}
              />
              {open && checkboxChangeHandler && (
                <FilterDropdown items={filterDropdownItems} />
              )}
              {open && !checkboxChangeHandler && renderDropdownItems()}
            </div>
          </OutsideClickHandler>
        )}
      </div>
    </th>
  );
};

export default ArticleTableHeadItem;
