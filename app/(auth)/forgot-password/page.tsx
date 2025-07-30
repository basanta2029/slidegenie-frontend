'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormError } from '@/components/auth/form-error'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/auth/validation'
import { authApi } from '@/lib/auth/api'
import { toast } from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    setError('')
    setLoading(true)

    try {
      await authApi.forgotPassword(data.email)
      setSubmitted(true)
      toast.success('Password reset instructions sent to your email')
    } catch (err: any) {
      setError(err.message || 'Failed to send reset instructions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold font-display">Check your email</h1>
          <p className="text-muted-foreground">
            We've sent password reset instructions to your academic email address.
          </p>
        </div>

        <div className="rounded-lg bg-muted p-4 text-sm">
          <p className="text-muted-foreground">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => setSubmitted(false)}
              className="text-primary hover:underline"
            >
              try again
            </button>
            .
          </p>
        </div>

        <Button
          onClick={() => router.push('/login')}
          variant="outline"
          className="w-full"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold font-display">Forgot password?</h1>
        <p className="text-muted-foreground">
          Enter your academic email and we'll send you reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormError message={error} />

        <div className="space-y-2">
          <Label htmlFor="email">Academic Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@university.edu"
            {...register('email')}
            disabled={loading}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending instructions...
            </>
          ) : (
            'Send reset instructions'
          )}
        </Button>
      </form>

      <Button
        onClick={() => router.push('/login')}
        variant="ghost"
        className="w-full"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to login
      </Button>
    </div>
  )
}