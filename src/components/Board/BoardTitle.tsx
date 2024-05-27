export default function BoardTitle({ text }: { text: string }) {
  return (
    <h1 className="mt-8 sm:text-xl md:text-2xl text-3xl font-bold text-center">
      {text}
    </h1>
  );
}
