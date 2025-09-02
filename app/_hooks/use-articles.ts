'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Article, SearchParams } from '@/app/_types'
import { TIME_UNITS } from '@/app/_lib/constants'

// 🗂️ Mock 데이터 (실제로는 API에서 가져올 데이터)
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Next.js 15 출시: 새로운 기능과 개선사항',
    excerpt: 'Next.js 15가 출시되어 React 19 지원, 성능 개선, 새로운 캐싱 전략 등 다양한 기능이 추가되었습니다.',
    content: 'Next.js 15의 상세 내용...',
    author: '김개발',
    publishedAt: new Date(Date.now() - 2 * TIME_UNITS.HOUR).toISOString(),
    imageUrl: '/images/nextjs-15.jpg',
    category: '기술',
    tags: ['Next.js', 'React', '웹개발'],
    viewCount: 1240,
    featured: true
  },
  {
    id: '2', 
    title: '2024년 웹 개발 트렌드: AI와 웹의 융합',
    excerpt: 'AI 기술이 웹 개발에 미치는 영향과 2024년 주목해야 할 웹 개발 트렌드를 살펴봅니다.',
    content: '2024년 웹 개발 트렌드에 대한 상세 분석...',
    author: '이기술',
    publishedAt: new Date(Date.now() - 5 * TIME_UNITS.HOUR).toISOString(),
    imageUrl: '/images/web-trends-2024.jpg',
    category: '기술',
    tags: ['AI', '웹개발', '트렌드'],
    viewCount: 890
  },
  {
    id: '3',
    title: '국내 스타트업 투자 동향: 2024년 4분기 분석',
    excerpt: '2024년 4분기 국내 스타트업 투자 현황과 주요 트렌드를 분석했습니다.',
    content: '스타트업 투자 동향 분석...',
    author: '박투자',
    publishedAt: new Date(Date.now() - TIME_UNITS.DAY).toISOString(),
    imageUrl: '/images/startup-investment.jpg',
    category: '경제',
    tags: ['스타트업', '투자', '경제'],
    viewCount: 567
  },
  {
    id: '4',
    title: '2025년 대선 후보 정책 비교 분석',
    excerpt: '주요 대선 후보들의 핵심 정책을 분야별로 비교 분석해보았습니다.',
    content: '대선 후보 정책 분석...',
    author: '최정치',
    publishedAt: new Date(Date.now() - 3 * TIME_UNITS.DAY).toISOString(),
    imageUrl: '/images/election-2025.jpg',
    category: '정치',
    tags: ['선거', '정책', '정치'],
    viewCount: 2340
  }
]

// 🎣 기본 기사 목록 훅
export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    
    const fetchArticles = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // 실제 API 호출을 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (isMounted) {
          setArticles(mockArticles)
        }
      } catch (err) {
        if (isMounted) {
          setError('기사를 불러오는데 실패했습니다.')
          console.error('Error fetching articles:', err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchArticles()
    
    return () => {
      isMounted = false
    }
  }, [])

  const refetch = useCallback(() => {
    window.location.reload()
  }, [])

  return { articles, loading, error, refetch }
}

// 🏷️ 카테고리별 기사 훅
export function useArticlesByCategory(category: string) {
  const { articles, loading, error, refetch } = useArticles()
  
  const filteredArticles = useMemo(() => 
    articles.filter(article => 
      category === 'all' || article.category === category
    ),
    [articles, category]
  )

  return { articles: filteredArticles, loading, error, refetch }
}

// 🔍 검색 기능 훅
export function useArticleSearch(searchParams: SearchParams = {}) {
  const { articles, loading, error } = useArticles()

  const filteredArticles = useMemo(() => {
    let result = [...articles]

    // 쿼리 검색
    if (searchParams.query) {
      const query = searchParams.query.toLowerCase()
      result = result.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // 카테고리 필터
    if (searchParams.category && searchParams.category !== 'all') {
      result = result.filter(article => article.category === searchParams.category)
    }

    // 태그 필터
    if (searchParams.tag) {
      result = result.filter(article => article.tags.includes(searchParams.tag!))
    }

    // 작가 필터
    if (searchParams.author) {
      result = result.filter(article => article.author === searchParams.author)
    }

    // 정렬
    if (searchParams.sortBy) {
      result.sort((a, b) => {
        switch (searchParams.sortBy) {
          case 'date':
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          case 'popularity':
            return (b.viewCount || 0) - (a.viewCount || 0)
          default:
            return 0
        }
      })
    }

    return result
  }, [articles, searchParams])

  return { articles: filteredArticles, loading, error }
}

// ⭐ 추천 기사 훅
export function useFeaturedArticles(limit = 3) {
  const { articles, loading, error } = useArticles()

  const featuredArticles = useMemo(() => 
    articles
      .filter(article => article.featured)
      .slice(0, limit),
    [articles, limit]
  )

  return { articles: featuredArticles, loading, error }
}

// 🔥 인기 기사 훅
export function usePopularArticles(limit = 5) {
  const { articles, loading, error } = useArticles()

  const popularArticles = useMemo(() => 
    articles
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, limit),
    [articles, limit]
  )

  return { articles: popularArticles, loading, error }
}