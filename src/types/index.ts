import type { ReactNode } from 'react';

/**
 * الأنواع العامة لمشروع متجر «الرشاقة والقوة»
 */

export interface StoreConfig {
  name: string;
  tagline: string;
  locale: 'ar';
  direction: 'rtl';
  minSupportedWidth: number;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface StoreSocialLinks {
  instagram: string;
  x: string;
  facebook: string;
  tiktok: string;
}

export interface StoreSettings {
  storeName: string;
  description: string;
  logo: string;
  coverImage: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: StoreSocialLinks;
}

export type MediaType = 'image' | 'video' | 'document' | 'other';

export type MediaCategory = 'store' | 'product' | 'category' | 'content' | 'general';

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: MediaType;
  category: MediaCategory;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  alt: string;
  createdAt: string;
}

export type ProductStatus = 'draft' | 'active' | 'inactive' | 'out_of_stock';

export interface ProductImage {
  mediaId: string;
  url: string;
  alt: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  status: ProductStatus;
  categoryId: string;
  images: ProductImage[];
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type CategoryStatus = 'active' | 'inactive';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: MediaAsset;
  parentId?: string | null;
  sortOrder: number;
  status: CategoryStatus;
  createdAt: string;
  updatedAt: string;
}





