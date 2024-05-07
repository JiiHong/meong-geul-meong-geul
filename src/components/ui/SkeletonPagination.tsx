import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function SkeletonPagination() {
  return (
    <div className="flex justify-center items-center gap-[2.25rem] w-full h-10 animate-pulse">
      <IoIosArrowBack className="text-lg text-slate-200 -mr-2" />
      <div className="rounded-full bg-slate-200 h-5 w-5"></div>
      <div className="rounded-full bg-slate-200 h-5 w-5"></div>
      <div className="rounded-full bg-slate-200 h-5 w-5"></div>
      <div className="rounded-full bg-slate-200 h-5 w-5"></div>
      <div className="rounded-full bg-slate-200 h-5 w-5"></div>
      <IoIosArrowForward className="text-lg text-slate-200 -ml-2" />
    </div>
  );
}
