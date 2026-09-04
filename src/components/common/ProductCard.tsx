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
          'group flex flex-col h-full overflow-hidden rounded-xl border-[#E5E1DA] bg-[#FFFFFF] text-start select-none',
          !inStock && 'opacity-80',
          className
        )}
        {...props}
      >
        {/* منطقة صورة المنتج (Fixed Aspect Ratio) */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#FAF8F5] border-b border-[#E5E1DA]">
          {/* شارات الحالة الاختيارية */}
          <div className="absolute top-2.5 start-2.5 z-10 flex flex-col gap-1.5 pointer-events-none">
            {!inStock ? (
              <Badge variant="default" size="sm">
                غير متوفر
              </Badge>
            ) : badgeText ? (
              <Badge variant={badgeVariant} size="sm">
                {badgeText}
              </Badge>
            ) : null}
          </div>

          {/* زر قائمة الرغبات الاختياري - منطقة لمس 48x48px على الأقل */}
          {showWishlistButton && (
            <button
              type="button"
              aria-label={isWishlisted ? 'إزالة من قائمة الرغبات' : 'إضافة إلى قائمة الرغبات'}
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist?.();
              }}
              className={cn(
                'absolute top-2 end-2 z-10 min-w-[48px] min-h-[48px] p-3 inline-flex items-center justify-center rounded-lg',
                'bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] border border-[#E5E1DA] text-[#161A18]',
                'transition-colors duration-150 ease-in-out',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4736]'
              )}
            >
              <Heart
                className={cn(
                  'w-4 h-4 transition-colors',
                  isWishlisted ? 'fill-[#B93834] text-[#B93834]' : 'text-[#4B534E]'
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
            <div className="absolute inset-0 bg-[#FAF8F5]/60 pointer-events-none" aria-hidden="true" />
          )}
        </div>

        {/* تفاصيل المنتج والإجراءات */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            {subtitle && (
              <span className="text-[11px] font-medium text-[#1257D6] tracking-wide">
                {subtitle}
              </span>
            )}

            <h3 className="text-sm sm:text-base font-semibold text-[#161A18] leading-snug line-clamp-2">
              {title}
            </h3>

            {/* قسم السعر */}
            <div className="flex items-baseline gap-2 pt-1 flex-wrap">
              <span className="text-base sm:text-lg font-semibold text-[#1A4736] leading-none">
                {price} <span className="text-xs font-normal text-[#4B534E]">{currency}</span>
              </span>

              {hasDiscount && (
                <span className="text-xs text-[#4B534E]/70 line-through leading-none">
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
