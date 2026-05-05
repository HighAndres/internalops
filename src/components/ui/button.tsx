'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#38D84E] text-black font-semibold hover:bg-[#2bb840] active:bg-[#22963a]',
  secondary:
    'bg-[#1A1A1A] text-white border border-[#2A2A2A] hover:bg-[#242424] hover:border-[#3A3A3A]',
  ghost: 'bg-transparent text-[#D1D5DB] hover:bg-[#1A1A1A] hover:text-white',
  danger:
    'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20',
  outline:
    'bg-transparent text-[#38D84E] border border-[#38D84E] hover:bg-[#38D84E]/10',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-7 px-3 text-xs rounded-md',
  md: 'h-9 px-4 text-sm rounded-lg',
  lg: 'h-11 px-6 text-base rounded-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', loading, disabled, className = '', children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(' ')}
        {...props}
      >
        {loading && (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
