import { css, cx } from '@emotion/css';
import config from 'app/config';
import { useState } from 'react';
import SuccessIcon from 'remixicon-react/CheckLineIcon';

interface UrlTabProps {
  state: 'success' | 'error' | 'untouched';
  type: string;
  url?: string;
  onEnterPress: (text: string) => void;
}

const UrlTab = ({ state, url, type, onEnterPress }: UrlTabProps) => {
  const isSuccess = state === 'success';
  const isError = state === 'error';

  const [mUrl, setUrl] = useState(url || '');

  return (
    <div className="relative w-full mt-3">
      <input
        className={cx(
          'w-full h-[52px] bg-grayscale-bg-dark text-grayscale-secondary text-sm rounded border border-gray-dark indent-5',
          {
            'border-error': isError,
            'border-success': isSuccess,
            'pr-8': isSuccess,
          },
          css([
            isError && {
              outlineColor: `${config.colors['error']}`,
            },
            isSuccess && {
              outlineColor: `${config.colors['success']}`,
            },
            { textIndent: '10px' },
          ])
        )}
        value={mUrl}
        type="text"
        name="url"
        placeholder={type}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.code === 'Enter') {
            onEnterPress(mUrl);
          }
        }}
      />
      {isSuccess && (
        <div className="flex absolute inset-y-0 right-0 items-center pointer-events-none">
          <SuccessIcon className="w-5 h-5 text-success mr-2" />
        </div>
      )}
    </div>
  );
};

export default UrlTab;
