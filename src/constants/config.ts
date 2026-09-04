import { StoreConfig, NavItem, StoreSettings } from '../types';

export const STORE_CONFIG: StoreConfig = {
  name: 'الرشاقة والقوة',
  tagline: 'وجهتك الأولى للياقة البدنية والمعدات الرياضية',
  locale: 'ar',
  direction: 'rtl',
  minSupportedWidth: 360,
};

export const INITIAL_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'الرئيسية', href: '#' },
  { id: 'categories', label: 'الأقسام', href: '#' },
  { id: 'offers', label: 'العروض', href: '#' },
  { id: 'about', label: 'من نحن', href: '#' },
];

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: '',
  description: '',
  logo: '',
  coverImage: '',
  email: '',
  phone: '',
  address: '',
  socialLinks: {
    instagram: '',
    x: '',
    facebook: '',
    tiktok: '',
  },
};
