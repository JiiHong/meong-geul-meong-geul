import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import { UserContextProvider } from '@/context/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '멍글멍글',
  description: '반려견 커뮤니티',
};

export default function RootLayout({
  children,
  loginModal,
}: Readonly<{
  children: React.ReactNode;
  loginModal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-gray-100 py-5`}>
        <div className="w-full max-w-5xl mx-auto p-8 bg-gray-50 rounded-4xl lg:p-4">
          <UserContextProvider>
            <Header />
            {children}
            {loginModal}
          </UserContextProvider>
        </div>
      </body>
    </html>
  );
}
