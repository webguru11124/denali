import { css, cx } from '@emotion/css';
import a11yKeydown from 'app/utils/a11y/keydown';

interface ToastProps {
  onClick: () => void;
  deletedCount?: number;
}

const Toast = ({ onClick, deletedCount }: ToastProps) => {
  return (
    <div
      className="flex justify-between items-center h-full rounded-lg pl-10 pr-5 border border-transparent 
    bg-gradient-article3 shadow-radius-gradient bg-origin-border font-lato"
    >
      {deletedCount && (
        <span className="text-grayscale-primary">
          {deletedCount} Audience is moved to trash
        </span>
      )}
      {!deletedCount && (
        <span className="text-grayscale-primary">Audience is updated</span>
      )}
      <a
        role="button"
        tabIndex={0}
        className={cx(
          `flex justify-between items-center bg-gradient-article1 rounded border border-transparent 
          py-0.5 px-1 bg-origin-border text-transparent shadow-radius-gradient active:shadow-none`,
          css(`&:active {
              span:first-child {
                display: none;
              }
              span:nth-child(2) {
                display: flex;
              }
            }`)
        )}
        onClick={onClick}
        onKeyDown={(e) => a11yKeydown(e, onClick)}
      >
        <span
          className="text-sm max-w-34 overflow-hidden text-ellipsis 
        whitespace-nowrap bg-gradient-text bg-clip-text"
        >
          Cancel
        </span>
      </a>
    </div>
  );
};

export default Toast;
