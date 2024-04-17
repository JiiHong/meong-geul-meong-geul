'use client';

import { ChangeEvent, useState } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { Board } from '@/types/board';

const DEFAULT_DATA = {
  title: '',
  content: '',
};

export default function WriteForm() {
  const [board, setBoard] =
    useState<Pick<Board, 'title' | 'content'>>(DEFAULT_DATA);
  const [fileName, setFileName] = useState('');

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setBoard({ ...board, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files[0];
    const name = file ? file.name : '';
    setFileName(name);
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
        onChange={handleTextChange}
        className="px-4 py-2 text-3xl border-b outline-none md:px-2 md:py-1 md:text-2xl"
      />

      <textarea
        name="content"
        rows={12}
        value={board.content}
        required
        placeholder="내용"
        onChange={handleTextChange}
        className="px-4 py-2 text-lg border outline-none rounded-lg md:px-2 md:py-1 md:text-base"
      />
      <div className="flex items-center gap-2 border rounded-lg">
        <label
          htmlFor="file"
          className="px-3 py-1 text-2xl text-white rounded-sm bg-gray-600 cursor-pointer"
        >
          <MdOutlineAddPhotoAlternate />
        </label>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <p className="text-sm text-gray-700">{fileName}</p>
      </div>
      <div className="self-end flex gap-1 text-lg [&_button]:px-6 [&_button]:py-2 [&_button]:rounded-lg md:[&_button]:px-4 md:[&_button]:py-1 md:[&_button]:text-base">
        <button className="border">취소</button>
        <button className="text-white border bg-amber-500">등록</button>
      </div>
    </form>
  );
}
