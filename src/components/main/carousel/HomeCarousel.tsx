import { headers } from 'next/headers';
import Image, { StaticImageData } from 'next/image';
import { UAParser } from 'ua-parser-js';
import carousel1 from '../../../../public/HomeCarouselImage/carousel1.jpeg';
import carousel2 from '../../../../public/HomeCarouselImage/carousel2.jpeg';
import carousel3 from '../../../../public/HomeCarouselImage/carousel3.jpeg';
import MultiCarousel from './MultiCarousel';

type Banner = {
  path: string;
  image: string | StaticImageData;
  alt: string;
  priority?: boolean;
};

const banners: Banner[] = [
  {
    path: 'https://www.animal.go.kr/front/community/show.do?boardId=contents&seq=66&menuNo=2000000016',
    image: carousel1,
    alt: '반려견 등록',
    priority: true,
  },
  {
    path: 'https://www.youtube.com/watch?v=Ki6c_h0gHMI',
    image: carousel2,
    alt: '펫티켓',
  },
  {
    path: 'https://apms.epis.or.kr/home/kor/main.do',
    image: carousel3,
    alt: '동물사랑배움터',
  },
];

export default function HomeCarousel() {
  const header = headers();
  const userAgent = header.get('user-agent') ?? navigator.userAgent;
  const parser = new UAParser();
  parser.setUA(userAgent);
  const result = parser.getResult();
  const deviceType = (result.device && result.device.type) || 'desktop';

  return (
    <MultiCarousel deviceType={deviceType}>
      {banners.map(({ path, image, alt, priority }) => (
        <a key={path} href={path} target="_blank">
          <Image src={image} alt={alt} priority={priority}></Image>
        </a>
      ))}
    </MultiCarousel>
  );
}
