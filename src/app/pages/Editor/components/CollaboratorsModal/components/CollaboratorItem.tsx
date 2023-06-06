import { cx } from '@emotion/css';
import { Collaborator } from 'app/store/editor/types';
import { ReactNode } from 'react';

interface CollaboratorItemProps {
  collaborator: Collaborator;
  index: number;
  children: ReactNode;
}

const CollaboratorItem = ({
  collaborator,
  index,
  children,
}: CollaboratorItemProps) => {
  const { avatar, fullName } = collaborator;
  return (
    <div
      className={cx('flex items-center w-full rounded-sm ', {
        'mt-3': index > 0,
      })}
    >
      <div className="flex items-center w-1/2">
        <div className="w-8 h-8 flex items-center justify-center  text-grayscale-secondary rounded border border-gray-light bg-white">
          <img className="rounded" src={avatar} alt="Avatar" />
        </div>
        <div className="flex flex-col justify-center min-w-0 ml-3">
          <div className="flex mb-0.5">
            <span className="text-sm text-ellipsis whitespace-nowrap overflow-hidden ">
              {fullName}
            </span>
          </div>
          <div className="flex mb-0.5">
            <span className="text-sm text-ellipsis text-grayscale-secondary whitespace-nowrap overflow-hidden ">
              {collaborator.email}
            </span>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default CollaboratorItem;
