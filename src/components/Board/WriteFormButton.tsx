import { useRouter } from 'next/navigation';

export default function WriteFormButton() {
  const router = useRouter();

  const handleCancelClick = () => router.back();

  return (
    <div className="self-end flex gap-1 text-lg [&_button]:px-6 [&_button]:py-2 [&_button]:rounded-lg md:[&_button]:px-4 md:[&_button]:py-1 md:[&_button]:text-base">
      <button type="button" className="border" onClick={handleCancelClick}>
        취소
      </button>
      <button className="text-white border bg-amber-500">등록</button>
    </div>
  );
}
