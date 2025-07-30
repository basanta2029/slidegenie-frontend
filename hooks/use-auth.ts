import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { api } from '@/lib/api-client'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useAuth() {
  const router = useRouter()
  const { user, isAuthenticated, login, logout, setLoading } = useAuthStore()

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token')
      if (token && !user) {
        setLoading(true)
        try {
          const { user } = await api.auth.me()
          login(user, token)
        } catch (error) {
          logout()
        } finally {
          setLoading(false)
        }
      }
    }
    checkAuth()
  }, [])

  const loginMutation = useMutation({
    mutationFn: api.auth.login,
    onSuccess: ({ token, user }) => {
      login(user, token)
      router.push('/dashboard')
    },
  })

  const logoutMutation = useMutation({
    mutationFn: api.auth.logout,
    onSuccess: () => {
      logout()
      router.push('/')
    },
  })

  const registerMutation = useMutation({
    mutationFn: api.auth.register,
    onSuccess: ({ token, user }) => {
      login(user, token)
      router.push('/dashboard')
    },
  })

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    register: registerMutation.mutate,
    isLoading: loginMutation.isPending || logoutMutation.isPending || registerMutation.isPending,
  }
}