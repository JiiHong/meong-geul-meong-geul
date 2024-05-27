'use client';

import { useState } from 'react';
import { Session } from 'next-auth';
import Image from 'next/image';
import { BoardCategory } from '@/types/Post';
import UserImage from '../../ui/UserImage';
import { formateFullTime } from '@/utils/day';
import RecommendButton from '../RecommendButton';
import usePost from '@/hooks/usePost';
import { HiDotsHorizontal } from 'react-icons/hi';
import PostDetailDropdown from './PostDetailDropdown';

type Props = {
  category: BoardCategory;
  postId: string;
  session: Session | null;
};

export default function PostDetailContent({
  category,
  postId,
  session,
}: Props) {
  const [isActive, setIsActive] = useState(false);
  const {
    postQuery: { data: post },
  } = usePost(category, session?.user.uid ?? '', postId);

  if (!post) return <></>;

  const {
    id,
    uid,
    title,
    name,
    content,
    viewCount,
    recommendCount,
    createdAt,
    userImage,
    contentImage,
  } = post;

  const handleClick = () => setIsActive((prev) => !prev);

  return (
    <section className="flex flex-col items-center p-8 rounded-3xl bg-white">
      <div className="w-11/12">
        <div className="flex justify-between items-center">
          <h1 className="mb-4 sm:text-2xl md:text-3xl text-4xl font-semibold">
            {title}
          </h1>
          <div className="relative">
            {session && (session.user.uid === uid || session.user.isAdmin) && (
              <>
                <button onClick={handleClick}>
                  <HiDotsHorizontal className="sm:text-lg md:text-xl text-2xl text-gray-700" />
                </button>
                <PostDetailDropdown
                  isActive={isActive}
                  category={category}
                  uid={uid}
                  id={id}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 pb-3 border-b">
          <UserImage title={name} userImage={userImage} size="medium" />
          <div className="flex flex-col -space-y-2">
            <span className="sm:text-sm md:text-base text-lg truncate">
              {name}
            </span>
            <div className="space-x-4">
              <span className="sm:text-2xs md:text-xs text-sm text-gray-400">
                {formateFullTime(createdAt)}
              </span>
              <span className="sm:text-2xs md:text-xs text-sm text-gray-400">
                조회수 {viewCount}
              </span>
            </div>
          </div>
        </div>
        <pre className="py-6 sm:text-base md:text-lg text-xl whitespace-pre-wrap">
          {content}
        </pre>
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
