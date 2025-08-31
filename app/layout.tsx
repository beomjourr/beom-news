import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SiteHeader from './_components/layouts/site-header'
import SiteFooter from './_components/layouts/site-footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Beom News',
  description: '신뢰할 수 있는 뉴스와 정보를 제공하는 플랫폼',
  keywords: ['뉴스', '정치', '경제', '스포츠', '기술', 'Beom News'],
  authors: [{ name: 'Beom News Team' }],
  openGraph: {
    title: 'Beom News',
    description: '신뢰할 수 있는 뉴스와 정보를 제공하는 플랫폼',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SiteHeader />
        <main className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}