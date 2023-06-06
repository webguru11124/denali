import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { useScreenBreakpoint } from 'app/hooks';
import getChannelTitle from 'app/pages/Editor/utils/getChannelTitle';
import { isMobile } from 'app/utils';
import { BasicChannelInfo } from 'submodules/common-ui/generated/api/gcs';

const GradientText = styled.p`
  background: linear-gradient(133.41deg, #323493 -0.08%, #df9e9c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

interface ChannelCellProps {
  channel: BasicChannelInfo | null;
}

const ChannelCell = ({ channel }: ChannelCellProps) => {
  const breakpoint = useScreenBreakpoint();
  const title = getChannelTitle(channel);
  return (
    <td
      className={cx('w-[200px] max-w-[244px]', {
        'w-[100px]': isMobile(breakpoint),
      })}
    >
      <div className="rounded border-[1px] px-2 py-[2px] border-gray-dark inline-block max-w-30">
        <GradientText className="text-sm line-clamp-1">{title}</GradientText>
      </div>
    </td>
  );
};

export default ChannelCell;
