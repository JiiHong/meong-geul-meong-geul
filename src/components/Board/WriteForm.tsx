'use client';

import { ChangeEvent, useState } from 'react';
import { WriteFormState } from '@/types/board';
import CustomFileInput from './CustomFileInput';
import WriteFormButton from './WriteFormButton';

const DEFAULT_DATA = {
  title: '',
  content: '',
};

export default function WriteForm() {
  const [board, setBoard] = useState<WriteFormState>(DEFAULT_DATA);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const { files } = e.target as HTMLInputElement;
    if (name === 'file') return setFile(files && (files[0] as File));
    setBoard({ ...board, [name]: value });
  };

  return (
    <form className="flex flex-col gap-4 h-full px-24 py-12 mt-8 rounded-3xl bg-white md:px-8 md:py-6">
      <input
        type="text"
        name="title"
        value={board.title}
        maxLength={29}
        required
        placeholder="제목"
        onChange={handleChange}
        className="px-4 py-2 text-3xl border-b outline-none md:px-2 md:py-1 md:text-2xl"
      />
      <textarea
        name="content"
        rows={12}
        value={board.content}
        required
        placeholder="내용"
        onChange={handleChange}
        className="px-4 py-2 text-lg border outline-none rounded-lg md:px-2 md:py-1 md:text-base"
      />
      <CustomFileInput onChange={handleChange} file={file} />
      <WriteFormButton />
    </form>
  );
}
