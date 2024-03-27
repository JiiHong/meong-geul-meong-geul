import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '멍글멍글',
  description: '반려견 커뮤니티',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-gray-100 py-5`}>
        <div className="w-full max-w-5xl mx-auto p-8 bg-gray-50 rounded-4xl">
          {children}
        </div>
      </body>
    </html>
  );
}
