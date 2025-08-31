import { NEWS_CATEGORIES } from '@/app/_lib/constants'

// 📰 뉴스 관련 타입
export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  imageUrl?: string
  category: string
  tags: string[]
  viewCount?: number
  featured?: boolean
}

export interface NewsCategory {
  id: string
  name: string
  slug: string
  description: string
  color?: string
  icon?: string
}

// 👤 사용자 관련 타입
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'editor' | 'reader'
  createdAt: string
}

// 🔍 검색 관련 타입
export interface SearchParams {
  query?: string
  category?: string
  tag?: string
  author?: string
  sortBy?: 'date' | 'relevance' | 'popularity'
  page?: number
  limit?: number
}

export interface SearchResult {
  articles: Article[]
  totalCount: number
  currentPage: number
  totalPages: number
  hasMore: boolean
}

// 📱 UI 관련 타입
export interface NavigationItem {
  href: string
  label: string
  icon?: React.ComponentType
  badge?: string | number
}

export interface BreadcrumbItem {
  href?: string
  label: string
  current?: boolean
}

// 🎨 컴포넌트 Props 타입
export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

// 📊 API 응답 타입
export interface ApiResponse<T = unknown> {
  data: T
  message: string
  success: boolean
  timestamp: string
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// 📝 폼 관련 타입
export interface FormState {
  isSubmitting: boolean
  errors: Record<string, string>
  isDirty: boolean
  isValid: boolean
}

// 🎭 유틸리티 타입
export type CategoryType = keyof typeof NEWS_CATEGORIES
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>