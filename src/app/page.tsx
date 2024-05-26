import BoardCard from '@/components/main/boardCard/BoardCard';
import HomeCarousel from '@/components/main/carousel/HomeCarousel';

export default function Home() {
  return (
    <main className="space-y-12">
      <HomeCarousel />
      <section className="space-y-3 text-center">
        <p className="text-4xl font-bold">멍글멍글</p>
        <p className="text-gray-600">함께하는 나의 반려견, 우리의 이야기</p>
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
    </main>
  );
}
