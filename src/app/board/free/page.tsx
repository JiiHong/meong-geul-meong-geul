import boards from '../../../../public/board.json';
import BoardCard from '@/components/Board/BoardCard';

export default function FreeBoardPage() {
  return (
    <section>
      <ul className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 py-8">
        {boards.map((board) => (
          <li
            key={board.id}
            className="h-64 border shadow-base rounded-2xl bg-white transition-all hover:-translate-y-2"
          >
            <BoardCard board={board} />
          </li>
        ))}
      </ul>
    </section>
  );
}
