import { notFound } from 'next/navigation'
import Image from 'next/image'
import { formatDate } from '@/app/_lib/utils'
import { Article } from '@/app/_types'

async function getArticle(id: string): Promise<Article | null> {
  const mockArticles: Article[] = [
    {
      id: '1',
      title: 'Next.js 15 출시: 새로운 기능과 개선사항',
      excerpt: 'Next.js 15가 출시되어 React 19 지원, 성능 개선, 새로운 캐싱 전략 등 다양한 기능이 추가되었습니다.',
      content: `
        <h2>Next.js 15의 주요 변화점</h2>
        <p>Next.js 15는 React 19를 완전히 지원하며, 다음과 같은 주요 개선사항을 포함합니다:</p>
        
        <h3>1. React 19 지원</h3>
        <p>React 19의 새로운 기능들을 완전히 활용할 수 있습니다. 서버 컴포넌트의 성능이 대폭 개선되었고, Suspense와 Error Boundary의 동작이 더욱 안정적이 되었습니다.</p>
        
        <h3>2. 새로운 캐싱 전략</h3>
        <p>더욱 세밀한 캐시 제어가 가능해졌습니다. 개발자는 이제 페이지별, 컴포넌트별로 캐싱 전략을 다르게 적용할 수 있습니다.</p>
        
        <h3>3. 성능 개선</h3>
        <p>빌드 시간이 30% 단축되었고, 런타임 성능도 크게 개선되었습니다. 특히 대용량 애플리케이션에서의 성능 향상이 두드러집니다.</p>
        
        <p>Next.js 15는 현재 베타 버전으로 제공되며, 안정 버전은 2024년 말에 출시될 예정입니다.</p>
      `,
      author: '김개발',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      imageUrl: '/images/nextjs-15.jpg',
      category: '기술',
      tags: ['Next.js', 'React', '웹개발'],
      viewCount: 1240
    },
    {
      id: '2', 
      title: '2024년 웹 개발 트렌드: AI와 웹의 융합',
      excerpt: 'AI 기술이 웹 개발에 미치는 영향과 2024년 주목해야 할 웹 개발 트렌드를 살펴봅니다.',
      content: `
        <h2>AI가 바꾸는 웹 개발의 미래</h2>
        <p>2024년 웹 개발 분야는 AI 기술의 급속한 발전으로 인해 큰 변화를 맞고 있습니다.</p>
        
        <h3>주요 트렌드</h3>
        <ul>
          <li><strong>AI 코드 생성:</strong> GitHub Copilot, ChatGPT 등을 활용한 코드 자동 생성</li>
          <li><strong>스마트 UI/UX:</strong> 사용자 행동 패턴을 학습하는 적응형 인터페이스</li>
          <li><strong>자동화된 테스팅:</strong> AI를 활용한 자동 테스트 케이스 생성</li>
          <li><strong>성능 최적화:</strong> AI 기반 번들 최적화 및 로딩 전략</li>
        </ul>
        
        <p>이러한 변화는 개발자의 생산성을 크게 향상시키고 있으며, 앞으로도 이 트렌드는 계속될 것으로 예상됩니다.</p>
      `,
      author: '이기술',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      imageUrl: '/images/web-trends-2024.jpg',
      category: '기술',
      tags: ['AI', '웹개발', '트렌드'],
      viewCount: 890
    }
  ]
  
  return mockArticles.find(article => article.id === id) || null
}

interface ArticlePageProps {
  params: Promise<{ id: string }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params
  const article = await getArticle(id)

  if (!article) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
            {article.category}
          </span>
          <span className="text-gray-500 text-sm">
            {formatDate(article.publishedAt)}
          </span>
          {article.viewCount && (
            <span className="text-gray-500 text-sm">
              · 조회수 {article.viewCount.toLocaleString()}
            </span>
          )}
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {article.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          {article.excerpt}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>작성자: {article.author}</span>
          <div className="flex gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {article.imageUrl && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      
      <footer className="mt-12 pt-8 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            게시일: {formatDate(article.publishedAt)}
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
              공유하기
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors">
              북마크
            </button>
          </div>
        </div>
      </footer>
    </article>
  )
}