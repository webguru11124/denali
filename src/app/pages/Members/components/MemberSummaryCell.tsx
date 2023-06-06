import { cx } from '@emotion/css';
import { PageLoader } from 'app/components';
import CheckBox from 'app/components/Checkbox';
import { Gallery } from 'iconsax-react';
import { useState } from 'react';


interface MemberSummaryCellProps {
  id: number,
  fullName: string,
  avatar: string,
  email: string
}

const MemberSummaryCell = ({
  id,
  fullName,
  avatar,
  email
}: MemberSummaryCellProps) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <td className="pl-3">
      <div className="flex justify-start items-center">
        <CheckBox
          id={`${email}${id}`}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="px-5 py-1">
          {avatar && !hasLoaded && !hasError && (
            <div className="w-[32px] h-[32px]">
              <PageLoader />
            </div>
          )}
          <img
            className={cx(
              'min-w-[32px] min-h-[32px] w-[32px] h-[32px] rounded border-2 border-white shadow-block',
              { hidden: (!hasLoaded && !hasError) || hasError }
            )}
            src={avatar}
            alt=""
            onLoad={() => {
              setHasLoaded(true);
              setHasError(false);
            }}
            onError={() => setHasError(true)}
          />

          {(hasError || !avatar) && (
            <div className="flex items-center justify-center bg-hover-blue text-focus w-[32px] h-[32px] rounded border-2 border-white shadow-block">
              <Gallery size={32} />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between min-w-0">
          <div className="text-ellipsis">
            {fullName}
          </div>
          <div className="text-grayscale-secondary">
            {email}
          </div>
        </div>
      </div>
    </td>
  );
};

export default MemberSummaryCell;
