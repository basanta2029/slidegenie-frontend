export const APP_NAME = 'SlideGenie'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PRESENTATIONS: '/dashboard/presentations',
  TEMPLATES: '/dashboard/templates',
  SETTINGS: '/dashboard/settings',
  PROFILE: '/dashboard/profile',
} as const

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },
  PRESENTATIONS: {
    LIST: '/presentations',
    CREATE: '/presentations',
    GET: (id: string) => `/presentations/${id}`,
    UPDATE: (id: string) => `/presentations/${id}`,
    DELETE: (id: string) => `/presentations/${id}`,
    EXPORT: (id: string) => `/presentations/${id}/export`,
  },
  TEMPLATES: {
    LIST: '/templates',
    GET: (id: string) => `/templates/${id}`,
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
  },
} as const

export const PRESENTATION_LAYOUTS = [
  { value: 'title', label: 'Title Slide' },
  { value: 'title-content', label: 'Title & Content' },
  { value: 'two-column', label: 'Two Column' },
  { value: 'image-right', label: 'Image Right' },
  { value: 'image-left', label: 'Image Left' },
  { value: 'full-image', label: 'Full Image' },
  { value: 'comparison', label: 'Comparison' },
  { value: 'quote', label: 'Quote' },
] as const

export const THEME_COLORS = {
  academic: {
    navy: '#1a365d',
    'navy-light': '#2c5282',
    gold: '#d69e2e',
    'gold-light': '#ecc94b',
  },
  modern: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#10b981',
  },
  minimal: {
    primary: '#18181b',
    secondary: '#71717a',
    accent: '#ef4444',
  },
} as const

export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  PRESENTATION: 50 * 1024 * 1024, // 50MB
} as const

export const ACCEPTED_FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  PRESENTATION: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
} as const