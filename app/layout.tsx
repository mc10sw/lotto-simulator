import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CFooter from "@/app/CFooter";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lotto Simulator',
  description: 'Calculate the estimated winning amount of the lottery game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className={'relative w-full h-screen'}>
        <div className={'w-screen md:w-full h-full overflow-y-scroll'}>{children}</div>
        <div className={'absolute w-screen md:w-full left-0 bottom-0'}><CFooter/></div>
      </div>
      </body>
    </html>
  )
}
