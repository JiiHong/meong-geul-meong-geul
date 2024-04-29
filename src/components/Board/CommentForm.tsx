export default function CommentForm() {
  return (
    <form className="flex">
      <input
        type="text"
        placeholder="댓글을 입력해주세요."
        className="px-4 py-2 grow border rounded-l-md outline-none"
      />
      <button className="px-4 py-2 text-gray-50 rounded-r-md bg-gray-600">
        등록
      </button>
    </form>
  );
}
