export interface User {
  id: string
  email: string
  name: string
  institution?: string
  role: 'student' | 'researcher' | 'professor'
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  institution: string
  role: 'student' | 'researcher' | 'professor'
  acceptTerms: boolean
}

export interface AuthError {
  message: string
  field?: string
  code?: string
}