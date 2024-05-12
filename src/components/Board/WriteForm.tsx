'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuid } from 'uuid';
import { Board, BoardCategory, WriteFormState } from '@/types/board';
import CustomFileInput from './CustomFileInput';
import WriteFormButton from './WriteFormButton';
import { useUserContext } from '@/context/UserContext';
import { uploadBoardImage } from '@/service/firebase/firebase-storage';
import usePosts from '@/hooks/usePosts';
import { createTime } from '@/utils/day';

const DEFAULT_DATA = {
  title: '',
  content: '',
};

type Props = {
  category: BoardCategory;
};

export default function WriteForm({ category }: Props) {
  const [post, setPost] = useState<WriteFormState>(DEFAULT_DATA);
  const [file, setFile] = useState<File | null>(null);
  const { user } = useUserContext();
  const router = useRouter();

  const { uploadPost } = usePosts(category);

  const uploadPostMutate = (
    id: string,
    newPost: Board,
    contentImage?: string,
  ) =>
    uploadPost.mutate(
      { id, newPost, contentImage },
      { onSuccess: () => router.replace(`/board/${category}`) },
    );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const { files } = e.target as HTMLInputElement;
    if (name === 'file') return setFile(files && files[0]);
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    if (post.title.trim().length < 1) {
      setPost((prev) => ({ ...prev, title: '' }));
      return alert('제목을 입력해주세요.');
    }
    if (post.content.trim().length < 1) {
      setPost((prev) => ({ ...prev, content: '' }));
      return alert('내용을 입력해주세요.');
    }

    const id = uuid();
    const { uid, name } = user;
    const newPost = {
      ...post,
      id,
      uid,
      name,
      recommendCount: 0,
      commentCount: 0,
      viewCount: 0,
      createdAt: createTime(),
    };

    if (file) {
      return uploadBoardImage(file, category) //
        .then((contentImage) => uploadPostMutate(id, newPost, contentImage));
    }
    return uploadPostMutate(id, newPost);
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
      <CustomFileInput onChange={handleChange} file={file} />
      <WriteFormButton disabled={uploadPost.isPending} />
    </form>
  );
}
