import MainGridContainer from '@/components/main/MainGridContainer';
import BoardCard from '@/components/main/boardCard/BoardCard';
import HomeCarousel from '@/components/main/carousel/HomeCarousel';

export default function Home() {
  return (
    <main className="sm:space-y-8 md:space-y-10 space-y-12">
      <HomeCarousel />
      <section className="space-y-3 text-center">
        <p className="sm:text-2xl md:text-3xl text-4xl font-bold">멍글멍글</p>
        <p className="sm:text-xs md:text-sm text-gray-600">
          함께하는 나의 반려견, 우리의 이야기
        </p>
      </section>
      <section className="flex md:flex-col flex-row gap-8 rounded-2xl ">
        <BoardCard
          category="info"
          title="정보게시판"
          calssName="bg-[#ECECEC]"
        />
        <BoardCard
          category="question"
          title="질문게시판"
          calssName="bg-[#F7F3FA]"
        />
        <BoardCard
          category="free"
          title="자유게시판"
          calssName="bg-[#CDDBEB4D]"
        />
      </section>
      <section className="space-y-2 text-center">
        <p className="sm:text-sm md:text-base text-lg text-gray-600">
          <span className="text-amber-500">함께하는 나의 반려견</span>, 우리의
          이야기
        </p>
        <p className="sm:text-sm md:text-base text-lg text-gray-600">
          새로운 모험과 소중한 순간들을
          <span className="text-amber-500"> 함께 나누는 곳</span>
        </p>
      </section>
      <section>
        <MainGridContainer />
      </section>
    </main>
  );
}
