import React, { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { ProductCard } from './ProductCard';
import type { ProductCardProps } from './ProductCard';
import { cn } from '../../utils/cn';

export interface ProductGridProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  items?: ProductCardProps[];
  columns?: 3 | 4;
}

export const ProductGrid = forwardRef<HTMLDivElement, ProductGridProps>(
  ({ children, items, columns = 4, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 items-stretch',
          columns === 4 ? 'lg:grid-cols-3 xl:grid-cols-4 lg:gap-6' : 'lg:grid-cols-3 lg:gap-6',
          className
        )}
        {...props}
      >
        {items &&
          items.map((item, index) => (
            <ProductCard
              key={item.id || `${item.title}-${index}`}
              {...item}
            />
          ))}
        {children}
      </div>
    );
  }
);

ProductGrid.displayName = 'ProductGrid';
