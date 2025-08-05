import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { AvailableParticipant } from 'app/api/chat/types';
import { Input, Spinner, FixedSizeInfiniteScroll } from 'app/components';
import { useSelector } from 'app/hooks';
import { useChatTranslation } from 'app/internationalization/hooks';
import { selectors } from 'app/store/auth';
import { makeAvatarFromUserId } from 'app/utils';
import { FC, useMemo } from 'react';
import SearchIcon from 'remixicon-react/SearchLineIcon';

import UserButton from './UserButton';
import UserTag from './UserTag';

interface UserSelectProps {
  inputValue: string;
  onInputValueChange: (val: string) => void;
  options: Array<AvailableParticipant>;
  selectedOptions: Array<AvailableParticipant>;
  onOptionSelect: (val: AvailableParticipant) => void;
  isLoading?: boolean;
  hasMore: boolean;
  loadMore: VoidFunction;
}

const getNameOfFirstItem = (items: Array<{ name: string }>) => items?.[0]?.name;

const SpinnerContainer = styled.div`
  .loader {
    margin: 10px;
  }
`;

const UserSelect: FC<UserSelectProps> = ({
  inputValue,
  onInputValueChange,
  options,
  selectedOptions,
  onOptionSelect,
  isLoading,
  hasMore,
  loadMore,
}) => {
  const tenant = useSelector(selectors.getSelectedTenant);
  const { t } = useChatTranslation();
  if (!tenant) throw new Error('[UserSelect]: no tenant selected');

  const selectedIds = useMemo(
    () =>
      selectedOptions.reduce<Array<number>>((acc, { id }) => [...acc, id], []),
    [selectedOptions]
  );

  return (
    <>
      <div className="z-50">
        <Input
          icon={<SearchIcon />}
          value={inputValue}
          onChange={(e) => {
            onInputValueChange(e.target.value);
          }}
          name="query"
          placeholder={`${t('Search')}`}
        />

        <div className="relative z-50">
          {isLoading && (
            <SpinnerContainer className="w-full flex justify-center">
              <Spinner />
            </SpinnerContainer>
          )}
        </div>
        <div className="flex overflow-x-auto">
          {selectedOptions.map(({ id, fullName, ...rest }) => (
            <UserTag
              className={cx('mt-2 mb-1 mr-2')}
              key={id}
              onClick={() => onOptionSelect({ id, fullName, ...rest })}
              userId={id}
              fullName={fullName}
            />
          ))}
        </div>
      </div>
      {!isLoading && Boolean(options.length) && (
        <FixedSizeInfiniteScroll
          height="350px"
          dataLength={options.length}
          hasMore={hasMore}
          loadMore={loadMore}
        >
          {options.map(({ fullName, professions, locations, id, ...rest }) => (
            <UserButton
              key={id}
              className="mb-3"
              isSelected={selectedIds.includes(id)}
              fullName={fullName}
              onClick={() => {
                onOptionSelect({
                  fullName,
                  professions,
                  locations,
                  id,
                  ...rest,
                });
              }}
              avatarSrc={makeAvatarFromUserId(tenant.url, id)}
              location={getNameOfFirstItem(locations)}
              profession={getNameOfFirstItem(professions)}
            />
          ))}
        </FixedSizeInfiniteScroll>
      )}
    </>
  );
};

export default UserSelect;
