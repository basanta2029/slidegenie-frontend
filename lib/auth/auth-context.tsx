'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, LoginCredentials, RegisterCredentials, AuthResponse } from '@/types/auth'
import { authApi } from '@/lib/auth/api'
import { toast } from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => Promise<void>
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        setLoading(false)
        return
      }

      const response = await authApi.verifyToken(token)
      if (response.user) {
        setUser(response.user)
      }
    } catch (error) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('refreshToken')
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials)
      handleAuthSuccess(response, credentials.rememberMe)
      toast.success('Welcome back!')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
      throw error
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await authApi.register(credentials)
      handleAuthSuccess(response, true)
      toast.success('Registration successful! Please verify your email.')
      router.push('/dashboard/onboarding')
    } catch (error: any) {
      toast.error(error.message || 'Registration failed')
      throw error
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      localStorage.removeItem('authToken')
      localStorage.removeItem('refreshToken')
      router.push('/login')
    }
  }

  const handleAuthSuccess = (response: AuthResponse, remember?: boolean) => {
    setUser(response.user)
    
    if (remember) {
      localStorage.setItem('authToken', response.token)
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken)
      }
    } else {
      sessionStorage.setItem('authToken', response.token)
      if (response.refreshToken) {
        sessionStorage.setItem('refreshToken', response.refreshToken)
      }
    }
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}