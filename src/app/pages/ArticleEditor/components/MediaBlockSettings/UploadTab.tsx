import { useEditor } from '@craftjs/core';
import { css, cx } from '@emotion/css';
import Spinner from 'app/components/Spinner';
import config from 'app/config';
import { Danger, TickCircle } from 'iconsax-react';
import { ChangeEventHandler } from 'react';
interface UploadTabProps {
  label: string;
  isLoading: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  state:
    | { type: 'success'; fileName: string }
    | { type: 'error' }
    | { type: 'untouched'; fileName?: string };
}

const UploadTab = ({ state, label, isLoading, onChange }: UploadTabProps) => {
  const { currentNodeId: nodeId, nodes } = useEditor((editorState) => {
    const [currentNodeId] = editorState.events.selected;

    return {
      currentNodeId,
      nodes: editorState.nodes,
    };
  });

  const FileLabel = (): JSX.Element => {
    if (error) {
      return <span className="text-error flex items-center">{label}</span>;
    }

    if (
      (state.type === 'untouched' && !state.fileName) ||
      state.type === 'error'
    ) {
      return (
        <span className="text-focus flex items-center">
          <span className="-mt-1 mr-1 text-lg">+</span>
          {label}
        </span>
      );
    }

    return (
      <div
        className={cx('flex min-w-0', {
          'ml-4':
            state.type === 'success' ||
            (state.type === 'untouched' && isLoading),
        })}
      >
        <span className="overflow-hidden text-ellipsis">{state.fileName}</span>
      </div>
    );
  };

  const error = nodes?.[nodeId]?.data.props?.error;

  return (
    <div className="w-full">
      <label htmlFor="fileInput" className="flex w-full mt-3 cursor-pointer">
        <div
          className={cx(
            'flex items-center bg-hover-blue w-full h-[52px]  text-grayscale-primary text-sm rounded',
            {
              'justify-center': state.type !== 'success',
              'justify-between': state.type === 'success',
              'border-[1px] border-error': state.type === 'error' || !!error,
              'border-[1px] border-success': state.type === 'success',
            },
            css([
              state.type === 'error' && {
                outlineColor: `${config.colors['error']}`,
              },
              state.type === 'success' && {
                outlineColor: `${config.colors['success']}`,
              },
            ])
          )}
        >
          {error ? (
            <>
              <div className="w-6 h-6 flex items-center pointer-events-none mr-[10px]">
                <Danger className="text-error" />
              </div>
            </>
          ) : (
            <>
              {state.type === 'success' && (
                <div className="w-6 h-6 flex items-center pointer-events-none mr-[10px]">
                  <TickCircle className="text-success" />
                </div>
              )}

              {isLoading && (
                <div className="w-6 h-6 flex items-center pointer-events-none mr-[10px]">
                  <Spinner className="w-3 h-3" />
                </div>
              )}
            </>
          )}
          <FileLabel />
        </div>
        <input
          id="fileInput"
          className="hidden"
          type="file"
          onChange={onChange}
        />
      </label>
      {error && (
        <div className="flex flex-row gap-2 mt-2">
          <div className="mt-1">
            <Danger size={16} color={config.colors.error} />
          </div>
          <span className="whitespace-normal text-sm text-left text-error">
            {error}
          </span>
        </div>
      )}
    </div>
  );
};

export default UploadTab;
