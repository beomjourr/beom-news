'use client'

import React from 'react'
import { useArticlesByCategory } from '@/app/_hooks/use-articles'
import ArticleCard from '@/app/_components/ui/article-card'
import { CATEGORY_LABELS } from '@/app/_lib/constants'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{ category: string } | null>(null)

  React.useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  const categoryKey = resolvedParams?.category || 'all'
  const categoryLabel = CATEGORY_LABELS[categoryKey] || categoryKey

  const { articles, loading, error } = useArticlesByCategory(categoryKey)

  if (!resolvedParams) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded mb-8 w-2/3"></div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          다시 시도
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryLabel}</h1>
        <p className="text-gray-600 text-lg">
          {categoryLabel} 관련 최신 뉴스와 분석을 확인하세요
        </p>
      </div>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <ArticleCard 
              key={article.id} 
              article={article}
              variant={index === 0 && articles.length > 3 ? 'featured' : 'default'}
            />
          ))}
        </div>
      </section>

      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{categoryLabel} 관련 기사가 없습니다.</p>
        </div>
      )}
    </div>
  )
}