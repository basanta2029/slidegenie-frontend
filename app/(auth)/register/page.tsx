'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { OAuthButton } from '@/components/auth/oauth-button'
import { FormError } from '@/components/auth/form-error'
import { PasswordStrength } from '@/components/auth/password-strength'
import { registerSchema, type RegisterInput } from '@/lib/auth/validation'
import { useAuth } from '@/lib/auth/auth-context'

// Common academic institutions (this would ideally come from an API)
const institutions = [
  'Harvard University',
  'Stanford University',
  'MIT',
  'Yale University',
  'Princeton University',
  'Columbia University',
  'University of Chicago',
  'University of Pennsylvania',
  'Caltech',
  'Duke University',
  'Johns Hopkins University',
  'Northwestern University',
  'Brown University',
  'Cornell University',
  'Other',
]

export default function RegisterPage() {
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [showOtherInstitution, setShowOtherInstitution] = useState(false)
  const router = useRouter()
  const { register: registerUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptTerms: false,
    },
  })

  const password = watch('password')
  const selectedRole = watch('role')

  const onSubmit = async (data: RegisterInput) => {
    setError('')
    setLoading(true)

    try {
      await registerUser(data)
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInstitutionChange = (value: string) => {
    if (value === 'Other') {
      setShowOtherInstitution(true)
      setValue('institution', '')
    } else {
      setShowOtherInstitution(false)
      setValue('institution', value)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold font-display">Create an account</h1>
        <p className="text-muted-foreground">
          Join SlideGenie with your academic email
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormError message={error} />

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            {...register('name')}
            disabled={loading}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="institution">Institution/University</Label>
          {!showOtherInstitution ? (
            <Select onValueChange={handleInstitutionChange} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Select your institution" />
              </SelectTrigger>
              <SelectContent>
                {institutions.map((inst) => (
                  <SelectItem key={inst} value={inst}>
                    {inst}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id="institution"
              placeholder="Enter your institution name"
              {...register('institution')}
              disabled={loading}
            />
          )}
          {errors.institution && (
            <p className="text-sm text-destructive">{errors.institution.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Academic Role</Label>
          <Select
            onValueChange={(value) => setValue('role', value as any)}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="researcher">Researcher</SelectItem>
              <SelectItem value="professor">Professor</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-sm text-destructive">{errors.role.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            disabled={loading}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
          {password && <PasswordStrength password={password} className="mt-2" />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            disabled={loading}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="acceptTerms"
            checked={watch('acceptTerms')}
            onCheckedChange={(checked) => setValue('acceptTerms', !!checked)}
            disabled={loading}
            className="mt-0.5"
          />
          <Label
            htmlFor="acceptTerms"
            className="text-sm font-normal leading-relaxed cursor-pointer"
          >
            I agree to SlideGenie's{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>
        {errors.acceptTerms && (
          <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or register with
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <OAuthButton provider="google" />
        <OAuthButton provider="microsoft" />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}