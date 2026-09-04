import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { Heart } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import type { ButtonVariant } from './Button';
import { Badge } from './Badge';
import type { BadgeVariant } from './Badge';
import { cn } from '../../utils/cn';

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  imageUrl: string;
  imageAlt?: string;
  badgeText?: string;
  badgeVariant?: BadgeVariant;
  inStock?: boolean;
  isWishlisted?: boolean;
  isAddingToCart?: boolean;
  showWishlistButton?: boolean;
  showAddToCartButton?: boolean;
  addToCartButtonVariant?: ButtonVariant;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      title,
      subtitle,
      price,
      originalPrice,
      currency = 'ر.س',
      imageUrl,
      imageAlt,
      badgeText,
      badgeVariant = 'gold',
      inStock = true,
      isWishlisted = false,
      isAddingToCart = false,
      showWishlistButton = true,
      showAddToCartButton = true,
      addToCartButtonVariant = 'secondary',
      onAddToCart,
      onToggleWishlist,
      className,
      ...props
    },
    ref
  ) => {
    const hasDiscount = originalPrice !== undefined && originalPrice > price;

    return (
      <Card
        ref={ref}
        variant="interactive"
        className={cn(
          'group flex flex-col h-full overflow-hidden border-[#E5DFD3] bg-[#F6F2E9] text-start select-none',
          !inStock && 'opacity-85',
          className
        )}
        {...props}
      >
        {/* منطقة صورة المنتج (Fixed Aspect Ratio) */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#EFE9DC] border-b border-[#E5DFD3]">
          {/* شارات الحالة الاختيارية */}
          <div className="absolute top-2.5 start-2.5 z-10 flex flex-col gap-1.5 pointer-events-none">
            {!inStock ? (
              <Badge variant="default" size="sm" className="bg-[#EBE5DA] text-[#5D5F58] border-[#DCD5C6]">
                غير متوفر
              </Badge>
            ) : badgeText ? (
              <Badge variant={badgeVariant} size="sm">
                {badgeText}
              </Badge>
            ) : null}
          </div>

          {/* زر قائمة الرغبات الاختياري */}
          {showWishlistButton && (
            <button
              type="button"
              aria-label={isWishlisted ? 'إزالة من قائمة الرغبات' : 'إضافة إلى قائمة الرغبات'}
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist?.();
              }}
              className={cn(
                'absolute top-2.5 end-2.5 z-10 min-w-[44px] min-h-[44px] p-2.5 inline-flex items-center justify-center rounded-[2px]',
                'bg-[#FAF7F2]/90 hover:bg-[#FAF7F2] border border-[#E5DFD3] text-[#171816]',
                'transition-colors duration-150 ease-in-out',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9E7D3B]'
              )}
            >
              <Heart
                className={cn(
                  'w-4 h-4 transition-colors',
                  isWishlisted ? 'fill-[#8A2E2B] text-[#8A2E2B]' : 'text-[#5D5F58]'
                )}
                aria-hidden="true"
              />
            </button>
          )}

          {/* صورة المنتج */}
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="w-full h-full object-cover object-center transition-transform duration-300 ease-out md:group-hover:scale-[1.02]"
            loading="lazy"
          />

          {/* طبقة شفافة ناعمة للمنتجات غير المتوفرة */}
          {!inStock && (
            <div className="absolute inset-0 bg-[#FAF7F2]/40 pointer-events-none" aria-hidden="true" />
          )}
        </div>

        {/* تفاصيل المنتج والإجراءات */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            {subtitle && (
              <span className="text-[11px] font-medium text-[#7D6126] tracking-wide">
                {subtitle}
              </span>
            )}

            <h3 className="text-sm sm:text-base font-semibold text-[#171816] leading-snug line-clamp-2">
              {title}
            </h3>

            {/* قسم السعر */}
            <div className="flex items-baseline gap-2 pt-1 flex-wrap">
              <span className="text-base sm:text-lg font-semibold text-[#1F3327] leading-none">
                {price} <span className="text-xs font-normal text-[#5D5F58]">{currency}</span>
              </span>

              {hasDiscount && (
                <span className="text-xs text-[#8E9089] line-through leading-none">
                  {originalPrice} {currency}
                </span>
              )}
            </div>
          </div>

          {/* زر إضافة للسلة الاختياري */}
          {showAddToCartButton && (
            <div className="pt-1">
              <Button
                variant={inStock ? addToCartButtonVariant : 'ghost'}
                size="md"
                className="w-full"
                disabled={!inStock}
                isLoading={isAddingToCart}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart?.();
                }}
              >
                {inStock ? 'إضافة للسلة' : 'غير متوفر'}
              </Button>
            </div>
          )}
        </div>
      </Card>
    );
  }
);

ProductCard.displayName = 'ProductCard';
