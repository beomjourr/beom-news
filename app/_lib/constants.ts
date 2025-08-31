// 🏷️ 카테고리 상수
export const NEWS_CATEGORIES = {
  ALL: 'all',
  POLITICS: 'politics',
  ECONOMY: 'economy', 
  SPORTS: 'sports',
  TECH: 'tech',
} as const

export const CATEGORY_LABELS: Record<string, string> = {
  [NEWS_CATEGORIES.ALL]: '전체',
  [NEWS_CATEGORIES.POLITICS]: '정치',
  [NEWS_CATEGORIES.ECONOMY]: '경제',
  [NEWS_CATEGORIES.SPORTS]: '스포츠',
  [NEWS_CATEGORIES.TECH]: '기술',
}

// 🎨 UI 상수
export const THEME_COLORS = {
  PRIMARY: 'blue',
  SECONDARY: 'gray',
  SUCCESS: 'green',
  WARNING: 'yellow',
  DANGER: 'red',
} as const

// 📐 레이아웃 상수
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const

// ⏱️ 시간 관련 상수
export const TIME_UNITS = {
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
} as const

// 📄 페이지네이션 상수
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
} as const

// 🔗 외부 링크
export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com',
  TWITTER: 'https://twitter.com',
  FACEBOOK: 'https://facebook.com',
} as const