'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { href: '/', label: '홈' },
    { href: '/politics', label: '정치' },
    { href: '/economy', label: '경제' },
    { href: '/sports', label: '스포츠' },
    { href: '/tech', label: '기술' },
  ]

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Beom News
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map(({ href, label }) => (
              <Link 
                key={href}
                href={href} 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map(({ href, label }) => (
                <Link 
                  key={href}
                  href={href} 
                  className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}