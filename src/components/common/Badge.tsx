import React, { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'destructive' | 'gold';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children?: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[#F2EFE9] text-[#161A18] border-[#E5E1DA]',
  success: 'bg-[#EBF3EF] text-[#1A4736] border-[#D6E4DC]',
  warning: 'bg-[#FBF6EA] text-[#825F18] border-[#EEDFB8]',
  destructive: 'bg-[#FDF2F1] text-[#A62F2B] border-[#F4CECC]',
  gold: 'bg-[#F8F4EA] text-[#7A6124] border-[#E6D8B6]',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-[11px] min-h-[22px]',
  md: 'px-3 py-1 text-xs min-h-[26px]',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium select-none rounded-full whitespace-nowrap border',
          'transition-colors duration-150 ease-in-out leading-tight tracking-tight',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
