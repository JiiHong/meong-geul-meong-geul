import IconHeart from '../ui/IconHeart';

export default function LikeButton() {
  return (
    <button className="px-6 py-3 border border-gray-400 rounded-md transition-all hover:bg-gray-50">
      <IconHeart className="text-2xl" />
      <span className="text-gray-800">{0}</span>
    </button>
  );
}
