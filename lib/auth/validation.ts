import { z } from 'zod'

// Regex for academic email validation (.edu domain)
const academicEmailRegex = /^[^\s@]+@[^\s@]+\.edu$/

// Password requirements
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const loginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .refine((email) => academicEmailRegex.test(email), {
      message: 'Please use your academic email address (.edu)',
    }),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .refine((email) => academicEmailRegex.test(email), {
      message: 'Please use your academic email address (.edu)',
    }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine((password) => passwordRegex.test(password), {
      message: 'Password must contain uppercase, lowercase, number, and special character',
    }),
  confirmPassword: z.string(),
  institution: z.string().min(2, 'Please enter your institution name'),
  role: z.enum(['student', 'researcher', 'professor'], {
    errorMap: () => ({ message: 'Please select your academic role' }),
  }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .refine((email) => academicEmailRegex.test(email), {
      message: 'Please use your academic email address (.edu)',
    }),
})

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine((password) => passwordRegex.test(password), {
      message: 'Password must contain uppercase, lowercase, number, and special character',
    }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>