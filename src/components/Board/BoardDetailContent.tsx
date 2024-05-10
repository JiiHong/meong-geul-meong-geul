'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BoardCategory } from '@/types/board';
import UserImage from '../ui/UserImage';
import { formateFullTime } from '@/utils/day';
import RecommendButton from './RecommendButton';
import usePost from '@/hooks/usePost';
import { HiDotsHorizontal } from 'react-icons/hi';
import BoardDetailDropdown from './BoardDetailDropdown';

type Props = {
  postId: string;
  category: BoardCategory;
};

export default function BoardDetailContent({ postId, category }: Props) {
  const [isActive, setIsActive] = useState(false);
  const {
    postQuery: { data: post },
  } = usePost(category, postId);

  if (!post) return <></>;

  const handleClick = () => setIsActive((prev) => !prev);

  const {
    id,
    title,
    name,
    content,
    viewCount,
    recommendCount,
    createdAt,
    userImage,
    contentImage,
  } = post;

  return (
    <section className="flex flex-col items-center p-8 rounded-3xl bg-white">
      <div className="w-4/5">
        <div className="flex justify-between items-center">
          <h1 className="mb-4 text-4xl font-semibold">{title}</h1>
          <div className="relative">
            <button onClick={handleClick}>
              <HiDotsHorizontal className="text-2xl text-gray-700" />
            </button>
            <BoardDetailDropdown isActive={isActive} />
          </div>
        </div>
        <div className="flex items-center gap-4 pb-3 border-b">
          <UserImage title={name} userImage={userImage} size={40} />
          <div className="flex flex-col -space-y-2">
            <span className="text-lg">{name}</span>
            <div className="space-x-4">
              <span className="text-sm text-gray-400">
                {formateFullTime(createdAt)}
              </span>
              <span className="text-sm text-gray-400">조회수 {viewCount}</span>
            </div>
          </div>
        </div>
        <p className="py-6 text-xl break-words">{content}</p>
        {contentImage && (
          <Image
            src={contentImage}
            alt={title}
            width={450}
            height={450}
            priority
          />
        )}
        <div className="flex flex-col items-center mt-10 text-center">
          <RecommendButton
            postId={id}
            recommendCount={recommendCount}
            category={category}
          />
        </div>
      </div>
    </section>
  );
}
