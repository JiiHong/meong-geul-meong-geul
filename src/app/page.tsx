import HomeCarousel from '@/components/main/carousel/HomeCarousel';

export default function Home() {
  return (
    <main className="space-y-12">
      <HomeCarousel />
      <section className="space-y-3 text-center">
        <p className="text-4xl font-bold">멍글멍글</p>
        <p className="text-gray-600">함께하는 나의 반려견, 우리의 이야기</p>
      </section>
    </main>
  );
}
