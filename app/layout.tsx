import Header from '@/components/Header';
import './globals.css';
import { Inter } from 'next/font/google';
import ActiveSectionContextProvider from '@/context/ActiveSectionContextProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Behzat Bilgin Erdem | Frontend Developer',
  description:
    'Behzat Bilgin is a frontend developer based in Ankara, Turkey with 3 years of experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='!scroll-smooth'>
      <body
        className={`${inter.className} relative bg-gray-50 pt-28 text-gray-950 sm:pt-36`}
      >
        <div className='absolute right-[11rem] top-[-6rem] -z-10 h-[31.25rem] w-[31.25rem] rounded-full bg-[#fbe2e3] blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='absolute left-[-35rem] top-[-1rem] -z-10 h-[50rem] w-[31.25rem] rounded-full bg-[#dbd7fb] blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]'></div>
        <ActiveSectionContextProvider>
          <Header />
          {children}
        </ActiveSectionContextProvider>
      </body>
    </html>
  );
}
