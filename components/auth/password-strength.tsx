'use client'

import { cn } from '@/lib/utils'
import { Check, X } from 'lucide-react'

interface PasswordStrengthProps {
  password: string
  className?: string
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const requirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /[A-Z]/, text: 'One uppercase letter' },
    { regex: /[a-z]/, text: 'One lowercase letter' },
    { regex: /\d/, text: 'One number' },
    { regex: /[@$!%*?&]/, text: 'One special character' },
  ]

  const strength = requirements.filter(req => req.regex.test(password)).length
  const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColor = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
  ][strength]

  if (!password) return null

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={cn('h-full transition-all duration-300', strengthColor)}
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-700 min-w-[80px]">
          {strengthText}
        </span>
      </div>
      
      <ul className="space-y-1 text-xs">
        {requirements.map((req, index) => {
          const met = req.regex.test(password)
          return (
            <li
              key={index}
              className={cn(
                'flex items-center space-x-1',
                met ? 'text-green-600' : 'text-gray-400'
              )}
            >
              {met ? (
                <Check className="w-3 h-3" />
              ) : (
                <X className="w-3 h-3" />
              )}
              <span>{req.text}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}