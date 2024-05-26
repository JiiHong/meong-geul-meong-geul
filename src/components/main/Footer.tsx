import { IoLogoGithub } from 'react-icons/io';

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center gap-1 mt-12 text-gray-600 rounded-bl-xl rounded-br-xl">
      <a
        href="https://github.com/JiiHong"
        target="_blank"
        className="md:text-base text-lg hover:text-gray-700"
      >
        <IoLogoGithub />
      </a>
      <span className="md:text-[0.7em] text-xs">
        © 2024 멍글멍글 All Rights Reserved.
      </span>
    </footer>
  );
}
