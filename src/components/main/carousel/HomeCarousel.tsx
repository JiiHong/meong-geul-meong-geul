import { headers } from 'next/headers';
import Image from 'next/image';
import { UAParser } from 'ua-parser-js';
import carousel1 from '../../../../public/HomeCarouselImage/carousel1.jpeg';
import carousel2 from '../../../../public/HomeCarouselImage/carousel2.jpeg';
import carousel3 from '../../../../public/HomeCarouselImage/carousel3.jpeg';
import MultiCarousel from './MultiCarousel';

export default function HomeCarousel() {
  const header = headers();

  const userAgent = header.get('user-agent') ?? navigator.userAgent;

  const parser = new UAParser();
  parser.setUA(userAgent);
  const result = parser.getResult();
  const deviceType = (result.device && result.device.type) || 'desktop';
  console.log(result);

  return (
    <MultiCarousel deviceType={deviceType}>
      <a
        href="https://www.animal.go.kr/front/community/show.do?boardId=contents&seq=66&menuNo=2000000016"
        target="_blank"
      >
        <Image src={carousel1} alt="반려견 등록" priority></Image>
      </a>
      <a href="https://www.youtube.com/watch?v=Ki6c_h0gHMI" target="_blank">
        <Image src={carousel2} alt="펫티켓"></Image>
      </a>

      <a href="https://apms.epis.or.kr/home/kor/main.do" target="_blank">
        <Image src={carousel3} alt="동물사랑배움터"></Image>
      </a>
    </MultiCarousel>
  );
}
