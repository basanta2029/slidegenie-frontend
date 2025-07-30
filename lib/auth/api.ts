import axios from 'axios'
import { LoginCredentials, RegisterCredentials, AuthResponse, User } from '@/types/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle token refresh on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken')
        if (!refreshToken) throw new Error('No refresh token')

        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        })

        const { token } = response.data
        localStorage.setItem('authToken', token)
        
        originalRequest.headers.Authorization = `Bearer ${token}`
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('authToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', credentials)
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  verifyToken: async (token: string): Promise<{ user: User }> => {
    const response = await api.get('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/reset-password', { token, password })
    return response.data
  },

  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/verify-email', { token })
    return response.data
  },

  // OAuth endpoints
  googleAuth: async (code: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/google', { code })
    return response.data
  },

  microsoftAuth: async (code: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/microsoft', { code })
    return response.data
  },
}