import { FC } from 'react';
import ArrowRightIcon from 'remixicon-react/ArrowRightSLineIcon';
import LinkIcon from 'remixicon-react/LinkIcon';

import IconButton from '../IconButton';

interface LinkButtonProps {
  to: string;
  label?: string;
}

const LinkButton: FC<LinkButtonProps> = ({ to, label }) => (
  <a
    href={to}
    target="_blank"
    className="w-full flex py-3 pl-3 pr-2 items-center bg-focus-background text-focus rounded"
    rel="noreferrer"
  >
    <LinkIcon className="text-focus mr-5" />
    <span className="flex flex-col">
      <span className="text-sm font-bold break-all line-clamp-1 pr-1">
        {label}
      </span>
      <span className="text-xs break-all line-clamp-1 pr-1">{to}</span>
    </span>
    <IconButton
      className="ml-auto"
      Icon={ArrowRightIcon}
      onClick={() => null}
    />
  </a>
);

export default LinkButton;
