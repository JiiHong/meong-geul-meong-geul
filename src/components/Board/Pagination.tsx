import { BoardCategory } from '@/types/Post';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

type Props = {
  totalItems: number;
  itemCountPerPage: number;
  pageCount: number;
  currentPage: number;
  category?: BoardCategory;
};

export default function Pagination({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
  category,
}: Props) {
  const [start, setStart] = useState(1);
  const totalPages = Math.ceil(totalItems / itemCountPerPage);

  useEffect(() => {
    const slideCount = Math.floor((currentPage - 1) / pageCount);
    setStart(pageCount * slideCount + 1);
  }, [currentPage, pageCount]);

  return (
    <div className="flex justify-center">
      <ul className="flex items-center gap-4 text-lg">
        <li className={`${start === 1 ? 'invisible' : 'visible'}`}>
          <Link
            href={`${category ? `${category}?page=${start - pageCount}` : `?page=${start - pageCount}`}`}
          >
            <IoIosArrowBack />
          </Link>
        </li>
        {[...Array(pageCount)].map((_, i) => (
          <React.Fragment key={i}>
            {i + start <= totalPages && (
              <li>
                <Link
                  href={`${category ? `${category}?page=${i + start}` : `?page=${i + start}`}`}
                  className={`block w-10 h-10 text-center leading-10 rounded-full ${i + start === currentPage ? 'bg-amber-600' : 'hover:bg-gray-200'}`}
                >
                  {i + start}
                </Link>
              </li>
            )}
          </React.Fragment>
        ))}
        <li
          className={`${totalPages - currentPage > pageCount ? 'visible' : 'invisible'}`}
        >
          <Link
            href={`${category ? `${category}?page=${start + pageCount}` : `?page=${start + pageCount}`}`}
          >
            <IoIosArrowForward />
          </Link>
        </li>
      </ul>
    </div>
  );
}
