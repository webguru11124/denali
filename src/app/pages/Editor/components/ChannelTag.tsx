import styled from '@emotion/styled';
import channelsIcon from 'assets/icons/channels-small.svg';
interface ChannelTagProps {
  children: React.ReactNode;
}
const ChannelTitleText = styled.span`
  background: linear-gradient(133.41deg, #323493 -0.08%, #df9e9c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
const ChannelTag = ({ children }: ChannelTagProps) => {
  return (
    <div className="inline-flex rounded border-gray-dark px-1 py-[3px] border-[1px] max-w-[180px]">
      <img className="h-4" src={channelsIcon} alt="" />
      <ChannelTitleText className="text-xs  ml-1 whitespace-nowrap overflow-hidden text-ellipsis">
        {children}
      </ChannelTitleText>
    </div>
  );
};
export default ChannelTag;
