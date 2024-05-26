import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import ReactQueryProvider from '@/components/ReactQueryProviders';
import NextAuthContext from '@/context/NextAuthContext';
import { UserContextProvider } from '@/context/UserContext';
import { ModalContextProvider } from '@/context/ModalContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | 멍글멍글',
    default: '멍글멍글',
  },
  description: '반려견 커뮤니티',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  loginModal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} p-5 md:px-0 bg-gray-100`}>
        <div className="w-full max-w-5xl mx-auto p-8 bg-gray-50 rounded-4xl lg:p-4">
          <ReactQueryProvider>
            <NextAuthContext>
              <UserContextProvider>
                <ModalContextProvider>
                  <Header />
                  {children}
                </ModalContextProvider>
              </UserContextProvider>
            </NextAuthContext>
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
