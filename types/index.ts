export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  createdAt: Date
  updatedAt: Date
}

export interface Article {
  id: string
  title: string
  content: string
  excerpt: string
  authorId: string
  author: User
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
  tags: string[]
  imageUrl?: string
}