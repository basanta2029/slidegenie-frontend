import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // For cookie-based auth
    })

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          this.handleUnauthorized()
        }
        return Promise.reject(this.handleError(error))
      }
    )
  }

  private getAuthToken(): string | null {
    // Get token from localStorage or cookies
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    return null
  }

  private handleUnauthorized() {
    // Clear auth data and redirect to login
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
  }

  private handleError(error: AxiosError) {
    if (error.response) {
      // Server responded with error
      return {
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data,
      }
    } else if (error.request) {
      // Request was made but no response
      return {
        message: 'Network error - please check your connection',
        status: 0,
      }
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
        status: 0,
      }
    }
  }

  // HTTP methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }
}

export const apiClient = new ApiClient()

// Export typed API methods for specific endpoints
export const api = {
  // Auth endpoints
  auth: {
    login: (data: { email: string; password: string }) =>
      apiClient.post<{ token: string; user: any }>('/auth/login', data),
    register: (data: { email: string; password: string; name: string }) =>
      apiClient.post<{ token: string; user: any }>('/auth/register', data),
    logout: () => apiClient.post('/auth/logout'),
    me: () => apiClient.get<{ user: any }>('/auth/me'),
  },

  // Presentation endpoints
  presentations: {
    list: (params?: { page?: number; limit?: number }) =>
      apiClient.get<{ presentations: any[]; total: number }>('/presentations', { params }),
    get: (id: string) => apiClient.get<{ presentation: any }>(`/presentations/${id}`),
    create: (data: FormData) =>
      apiClient.post<{ presentation: any }>('/presentations', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    update: (id: string, data: any) =>
      apiClient.put<{ presentation: any }>(`/presentations/${id}`, data),
    delete: (id: string) => apiClient.delete(`/presentations/${id}`),
  },

  // Add more endpoint groups as needed
}