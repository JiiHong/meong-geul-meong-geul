'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CustomLeftArrow from './CustomLeftArrow';
import CustomRightArrow from './CustomRightArrow';

type Props = { children: React.ReactNode; deviceType: string };

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function MultiCarousel({ children, deviceType }: Props) {
  return (
    <Carousel
      responsive={responsive}
      ssr
      showDots
      autoPlay
      autoPlaySpeed={5000}
      infinite
      swipeable
      deviceType={deviceType}
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
      containerClass="mt-4 rounded-2xl shadow-base"
    >
      {children}
    </Carousel>
  );
}
