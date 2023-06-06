import { cx } from '@emotion/css';
import { useScreenBreakpoint } from 'app/hooks';
import { isMobile } from 'app/utils';
import { ArticleAudiencesResourcesInner } from 'submodules/common-ui/generated/api/gcs';

interface AudienceCellProps {
  audienceResources?: ArticleAudiencesResourcesInner[];
}

const AudienceCell = ({ audienceResources }: AudienceCellProps) => {
  const breakpoint = useScreenBreakpoint();
  return (
    <td
      className={cx('w-[300px] max-w-[344px]', {
        'w-[200px]': isMobile(breakpoint),
      })}
    >
      {(!audienceResources || audienceResources.length === 0) && <span>-</span>}

      {audienceResources && audienceResources.length > 0 && (
        <div className="flex flex-col text-sm text-black">
          <span>{audienceResources[0].name}</span>
          {audienceResources.length > 1 && (
            <span>
              {audienceResources[1].name}{' '}
              {audienceResources.length > 2 &&
                `[+${audienceResources.length - 2}]`}
            </span>
          )}
        </div>
      )}
    </td>
  );
};

export default AudienceCell;
