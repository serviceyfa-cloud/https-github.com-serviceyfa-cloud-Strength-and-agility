import React, { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#1A4736] text-[#FAF8F5] border border-[#1A4736] hover:bg-[#14372A] active:bg-[#0F2C21]',
  secondary:
    'bg-[#EBF3EF] text-[#1A4736] border border-[#E5E1DA] hover:bg-[#DFEBE4] active:bg-[#D3E2D8]',
  ghost:
    'bg-transparent text-[#161A18] border border-transparent hover:bg-[#EBF3EF] hover:text-[#1A4736] active:bg-[#DFEBE4]',
  destructive:
    'bg-[#B93834] text-[#FAF8F5] border border-[#A52F2B] hover:bg-[#A52F2B] active:bg-[#8F2825]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'min-h-[48px] px-4 py-2.5 text-xs sm:text-sm gap-2',
  md: 'min-h-[48px] px-5 py-3 text-xs sm:text-sm gap-2',
  lg: 'min-h-[52px] px-6 py-3.5 text-sm sm:text-base gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isButtonDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isButtonDisabled}
        aria-busy={isLoading}
        className={cn(
          'relative inline-flex items-center justify-center font-medium select-none rounded-xl whitespace-nowrap',
          'transition-all duration-150 ease-in-out active:scale-[0.99]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4736] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F5]',
          'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:active:scale-100',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <span
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
          </span>
        )}

        <span
          className={cn(
            'inline-flex items-center justify-center',
            size === 'sm' && 'gap-2',
            size === 'md' && 'gap-2',
            size === 'lg' && 'gap-2.5',
            isLoading && 'opacity-0 select-none pointer-events-none'
          )}
        >
          {leftIcon && <span className="shrink-0 leading-none">{leftIcon}</span>}
          {children && <span className="leading-tight">{children}</span>}
          {rightIcon && <span className="shrink-0 leading-none">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
