import Image from 'next/image';
import gamza from '../../../public/HomeGridImage/gamza.jpeg';
import haru from '../../../public/HomeGridImage/haru.jpeg';
import made1 from '../../../public/HomeGridImage/made1.jpeg';
import som from '../../../public/HomeGridImage/som.jpeg';
import made2 from '../../../public/HomeGridImage/made2.jpeg';
import gguriLucky from '../../../public/HomeGridImage/gguriLucky.jpeg';

export default function MainGridContainer() {
  return (
    <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-6 gap-2 h-72 [&_div]:relative [&_div]:shadow-base [&_div]:rounded-lg [&_div]:overflow-hidden [&_div]:transition-all">
      <div className="sm:hidden row-span-2 col-span-2 hover:scale-105">
        <Image
          src={gamza}
          alt="감자"
          fill
          sizes="(max-width: 639px) 0vw, 30vw"
          className="object-cover"
        ></Image>
      </div>
      <div className="col-span-2 hover:scale-105">
        <Image
          src={haru}
          alt="하루"
          fill
          sizes="(max-width: 639px) 70vw, 30vw"
          className="object-cover"
        ></Image>
      </div>
      <div className="hover:scale-105">
        <Image
          src={made1}
          alt="그림1"
          fill
          sizes="(max-width: 639px) 30vw, (max-width: 767px) 15vw, 15vw"
          className="object-cover"
        ></Image>
      </div>
      <div className="sm:hidden md:hidden row-span-2 hover:scale-105">
        <Image
          src={som}
          alt="솜이"
          fill
          sizes="(max-width: 767px) 0vw, 15vw"
          className="object-cover"
        ></Image>
      </div>
      <div className="hover:scale-105">
        <Image
          src={made2}
          alt="그림2"
          fill
          sizes="(max-width: 639px) 30vw, 15vw"
          className="object-cover"
        ></Image>
      </div>
      <div className="col-span-2 hover:scale-105">
        <Image
          src={gguriLucky}
          alt="꾸리, 럭키"
          fill
          sizes="(max-width: 639px) 60vw, (max-width: 767px) 30vw, 30vw"
          className="object-cover"
        ></Image>
      </div>
    </div>
  );
}
