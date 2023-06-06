import { cx } from '@emotion/css';
import config from 'app/config';
import { Icon as IIcon } from 'iconsax-react';
import { FC, HTMLAttributes } from 'react';
import { RemixiconReactIconComponentType } from 'remixicon-react';
import CloseIcon from 'remixicon-react/CloseLineIcon';

interface Props extends HTMLAttributes<HTMLDivElement> {
  Icon: RemixiconReactIconComponentType | IIcon;
  title?: string;
  description: string;
  className?: HTMLAttributes<HTMLDivElement>['className'];
  iconSize?: number;
  onClose?: () => void;
}

const AlertInfo: FC<Props> = ({
  description,
  title,
  Icon,
  iconSize = 28,
  className,
  onClose,
  ...restProps
}) => {
  return (
    <div
      {...restProps}
      className={cx(
        'flex flex-row items-center bg-hover-blue rounded-lg p-4 gap-4',
        className
      )}
    >
      <div>
        <Icon color={config.colors.focus} size={iconSize} />
      </div>
      <div className="grow">
        {title && <h4 className="font-semibold leading-5">{title}</h4>}
        <p className="text-grayscale-secondary text-sm ">{description}</p>
      </div>
      {!!onClose && (
        <div className="h-full">
          <CloseIcon
            color={config.colors['grayscale-secondary']}
            size={24}
            onClick={() => onClose && onClose()}
          />
        </div>
      )}
    </div>
  );
};

export default AlertInfo;
