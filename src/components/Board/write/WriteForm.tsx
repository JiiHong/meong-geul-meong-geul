'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { v4 as uuid } from 'uuid';
import { Post, BoardCategory, WriteFormState } from '@/types/Post';
import CustomFileInput from '../CustomFileInput';
import WriteFormButton from './WriteFormButton';
import { uploadBoardImage } from '@/service/firebase/firebase-storage';
import usePosts from '@/hooks/usePosts';
import { createTime } from '@/utils/day';

const DEFAULT_DATA = {
  title: '',
  content: '',
};

type Props = {
  category: BoardCategory;
  session: Session;
};

export default function WriteForm({ category, session }: Props) {
  const [post, setPost] = useState<WriteFormState>(DEFAULT_DATA);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { uploadPost } = usePosts(category);

  const uploadPostMutate = (
    uid: string,
    id: string,
    newPost: Post,
    contentImage?: string,
  ) =>
    uploadPost.mutate(
      { uid, id, newPost, contentImage },
      { onSuccess: () => router.replace(`/board/${category}`) },
    );

  const setFileNull = () => setFile(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const { files } = e.target as HTMLInputElement;

    if (files && !files[0]) return;

    if (name === 'file' && files) return setFile(files[0]);

    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) return;
    if (post.title.trim().length < 1) {
      setPost((prev) => ({ ...prev, title: '' }));
      return alert('제목을 입력해주세요.');
    }
    if (post.content.trim().length < 1) {
      setPost((prev) => ({ ...prev, content: '' }));
      return alert('내용을 입력해주세요.');
    }

    if (category === 'info' && file === null)
      return alert('정보게시판 글은 사진이 필수입니다!');

    setIsLoading((prev) => !prev);

    const id = uuid();
    const { uid, name, profileImage } = session.user;

    const newPost: Post = {
      ...post,
      id,
      uid,
      name: name ?? '',
      recommendCount: 0,
      commentCount: 0,
      viewCount: 0,
      category,
      createdAt: createTime(),
    };
    profileImage && (newPost.userImage = profileImage);

    if (file) {
      return uploadBoardImage(file, category) //
        .then((contentImage) =>
          uploadPostMutate(uid, id, newPost, contentImage),
        )
        .then(() => setIsLoading((prev) => !prev));
    }
    uploadPostMutate(uid, id, newPost);
    setIsLoading((prev) => !prev);
  };

  return (
    <form
      className="flex flex-col gap-4 h-full px-24 py-12 mt-8 rounded-3xl bg-white md:px-8 md:py-6"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        value={post.title}
        maxLength={29}
        required
        placeholder="제목"
        onChange={handleChange}
        className="px-4 py-2 text-3xl border-b outline-none md:px-2 md:py-1 md:text-2xl"
      />
      <textarea
        name="content"
        rows={12}
        value={post.content}
        required
        placeholder="내용"
        onChange={handleChange}
        className="px-4 py-2 text-lg border outline-none rounded-lg md:px-2 md:py-1 md:text-base"
      />
      <CustomFileInput
        onChange={handleChange}
        setFileNull={setFileNull}
        file={file}
      />
      <WriteFormButton disabled={isLoading} />
    </form>
  );
}
