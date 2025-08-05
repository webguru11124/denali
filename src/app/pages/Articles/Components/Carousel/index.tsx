import { cx } from '@emotion/css';
import useGetArticlesQuery from 'app/api/articles/hooks/useArticles';
import useGetSharingConnectionQuery from 'app/api/articleSharing/hooks/useGetSharingConnectionQuery';
import { PageLoader } from 'app/components';
import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import CarouselControls from './CarouselControls';
import CarouselItem from './CarouselItem';
import Empty from './Empty';

const Caroussel = () => {
  const sliderRef = useRef<Slider>(null);
  const sliderParentRef = useRef<HTMLDivElement>(null);

  const handlePrevClick = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.current?.slickNext();
  };

  const { data: articles, isLoading } = useGetArticlesQuery({
    page: 0,
    filters: {
      status: 'inbound',
    },
  });

  const { data } = useGetSharingConnectionQuery({ include: 'tenants' });

  const onCollapseClick = () => {
    if (sliderParentRef.current?.classList.contains('h-[356px]')) {
      sliderParentRef.current?.classList.replace('h-[356px]', 'h-0');
      sliderParentRef.current?.classList.add('overflow-hidden');
      return;
    }

    sliderParentRef.current?.classList.replace('h-0', 'h-[356px]');
    sliderParentRef.current?.classList.remove('overflow-hidden');
  };

  return (
    <div className="flex flex-col mt-8">
      <CarouselControls
        collapseClick={onCollapseClick}
        numArticles={articles?.length ?? 0}
        handleNextClick={handleNextClick}
        handlePrevClick={handlePrevClick}
      />
      <div
        ref={sliderParentRef}
        className={cx(
          'bg-gradient-slider mt-3 h-[356px] transition-height duration-500 ease-in-out',
          {
            'w-0 min-w-full overflow-hidden': articles && articles.length > 0,
            'flex justify-center': articles && articles.length === 0,
          }
        )}
      >
        {articles && articles.length === 0 && <Empty />}

        {isLoading && <PageLoader />}
        {articles && articles.length > 0 && (
          <Slider
            infinite={articles.length > 5}
            slidesToShow={5}
            slidesToScroll={1}
            ref={sliderRef}
            centerMode={true}
            centerPadding="40px"
            className="mt-2"
            arrows={false}
          >
            {articles.map((article, index) => (
              <CarouselItem
                key={`${index}-item`}
                article={article}
                tenant={data?.receivers?.find(
                  (r) => r.id === article.originalTenant?.id
                )}
                index={index}
              />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Caroussel;
