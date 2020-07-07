import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
  import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listBanner } from '../actions/detailAction';

const Banner = (props) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const bannerList = useSelector ( state => state.bannerList)
  const { banners, loading, error} = bannerList

  const dispatch = useDispatch();

  useEffect( () => {
      dispatch(listBanner())

      return () => {

      }
    }, [])

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === banners.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? banners.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = banners.map((banner) => {
    return (
        <CarouselItem className='product-best'
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={banner.image}
      >
        <img src={banner.image} alt={banner.name} className="carousel-inner"/>
        <CarouselCaption captionText={banner.name} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={banners} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default Banner;