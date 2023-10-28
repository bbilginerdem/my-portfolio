import Header from '@/components/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import ActiveSectionContextProvider from '@/context/ActiveSectionContextProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Behzat Bilgin Erdem | Frontend Developer',
  description: 'Behzat Bilgin is a frontend developer based in Ankara, Turkey with 3 years of experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36`}>
        <div className="-z-10 bg-[#fbe2e3] absolute top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] left-[-35rem] h-[50rem] w-[31.25rem] rounded-full -z-10 sm:w-[68.75rem] blur-[10rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
        <ActiveSectionContextProvider>
          <Header />
          {children}
        </ActiveSectionContextProvider>
      </body>
    </html>
  )
}
