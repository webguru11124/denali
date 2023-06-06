import CheckBox from 'app/components/Checkbox';
import getChannelTitle from 'app/pages/Editor/utils/getChannelTitle';
import { BasicChannelInfo } from 'submodules/common-ui/generated/api/gcs';

interface ItemProps {
  channel: BasicChannelInfo;
}

interface CheckItemsDropdownProps {
  channels: BasicChannelInfo[];
  selectedChannels: BasicChannelInfo[];
  onReset: () => void;
  onChange: (channel: BasicChannelInfo, checked: boolean) => void;
}

const CheckItemsDropdown = ({
  channels,
  selectedChannels,
  onChange,
  onReset,
}: CheckItemsDropdownProps) => {
  const Item = ({ channel }: ItemProps) => {
    const isChecked = !!selectedChannels.find((e) => e.id === channel.id);
    return (
      <div className="flex items-center gap-2">
        <CheckBox
          onChange={(e) => onChange(channel, e.target.checked)}
          id={channel.id.toString()}
          checked={isChecked}
        />
        <p className="text-sm font-normal text-left line-clamp-1">
          {getChannelTitle(channel)}
        </p>
      </div>
    );
  };
  return (
    <div className="max-w-56 dropdown-menu min-w-max absolute bg-white z-50 rounded-lg shadow-lg m-0 bg-clip-padding transform -translate-x-1/2 translate-y-8 flex flex-col shadow-atobi">
      <div className="p-4 py-4 flex gap-4 flex-col">
        <div className="flex justify-start">
          <span className="text-sm text-grayscale-secondary font-normal">
            Filter by:
          </span>
        </div>
        {channels.map((channel, idx) => (
          <Item key={idx} channel={channel} />
        ))}
      </div>
      {selectedChannels.length > 0 && (
        <button className="bg-grayscale-bg-dark py-2" onClick={onReset}>
          <span className="text-focus font-medium text-base">Deselect all</span>
        </button>
      )}
    </div>
  );
};

export default CheckItemsDropdown;
