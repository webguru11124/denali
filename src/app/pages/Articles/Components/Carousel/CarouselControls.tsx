import { cx } from '@emotion/css';
import { VerticalChevron } from 'app/components';
import {
  DirectInbox,
  DocumentCopy,
  ArrowLeft2,
  ArrowRight2,
} from 'iconsax-react';

interface CarouselControlsProps {
  numArticles: number;
  collapseClick: VoidFunction;
  handlePrevClick: VoidFunction;
  handleNextClick: VoidFunction;
}

const CarouselControls = ({
  numArticles,
  collapseClick,
  handleNextClick,
  handlePrevClick,
}: CarouselControlsProps) => {
  const canScroll = numArticles > 5;

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center justify-center ml-5">
        <DirectInbox size={16} />
        <span className="ml-1 font-bold">Atobi Connect</span>
        <div className="flex bg-hover-blue text-focus text-xs items-center justify-evenly ml-3 rounded px-1 py-1">
          <DocumentCopy size={12} className="mr-[2px]" />
          <span>{numArticles}</span>
        </div>
        {numArticles === 0 && (
          <VerticalChevron onClick={collapseClick} className="ml-5" />
        )}
      </div>

      {numArticles > 0 && (
        <div className="flex justify-end items-center basis-0 grow p-2 mr-8">
          <button
            className="flex items-center justify-center whitespace-nowrap mr-3 text-grayscale-secondary"
            type="button"
            disabled={!canScroll}
            onClick={() => handlePrevClick()}
          >
            <ArrowLeft2
              className={cx({
                'text-gray-dark': !canScroll,
              })}
            />
          </button>
          <button
            className="flex items-center justify-center whitespace-nowrap text-grayscale-secondary"
            type="button"
            disabled={!canScroll}
            onClick={() => handleNextClick()}
          >
            <ArrowRight2
              className={cx({
                'text-gray-dark': !canScroll,
              })}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default CarouselControls;
