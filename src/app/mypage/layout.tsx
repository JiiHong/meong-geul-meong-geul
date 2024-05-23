import MyPageNavbar from '@/components/my/MyPageNavbar';

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex gap-5">
      <aside className="basis-2/12 pt-2 border-r">
        <MyPageNavbar />
      </aside>
      <section className="basis-10/12 p-4">{children}</section>
    </main>
  );
}
