import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/app/_types'
import { formatRelativeTime, truncateText } from '@/app/_lib/utils'
import { cn } from '@/app/_lib/utils'

interface ArticleCardProps {
  article: Article
  className?: string
  variant?: 'default' | 'featured'
}

export default function ArticleCard({ 
  article, 
  className,
  variant = 'default' 
}: ArticleCardProps) {
  const isFeautured = variant === 'featured'

  return (
    <article 
      className={cn(
        "bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow",
        isFeautured && "md:col-span-2 md:row-span-2",
        className
      )}
    >
      <Link href={`/article/${article.id}`}>
        <div className="relative">
          {article.imageUrl && (
            <div className={cn(
              "relative w-full",
              isFeautured ? "h-64 md:h-96" : "h-48"
            )}>
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover rounded-t-lg"
                sizes={
                  isFeautured 
                    ? "(max-width: 768px) 100vw, 66vw"
                    : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                }
                priority={isFeautured}
              />
            </div>
          )}
          
          <div className={cn("p-6", isFeautured && "md:p-8")}>
            {/* Meta Info */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                {article.category}
              </span>
              <span className="text-gray-500 text-sm">
                {formatRelativeTime(article.publishedAt)}
              </span>
            </div>
            
            {/* Title */}
            <h3 className={cn(
              "font-semibold text-gray-900 mb-2 line-clamp-2",
              isFeautured ? "text-2xl md:text-3xl" : "text-lg"
            )}>
              {article.title}
            </h3>
            
            {/* Excerpt */}
            <p className={cn(
              "text-gray-600 mb-4 line-clamp-2",
              isFeautured ? "text-base" : "text-sm"
            )}>
              {truncateText(article.excerpt, isFeautured ? 200 : 120)}
            </p>
            
            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">{article.author}</span>
              <div className="flex gap-1">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}