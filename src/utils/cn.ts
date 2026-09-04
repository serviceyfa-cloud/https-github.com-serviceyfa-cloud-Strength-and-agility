/**
 * دالة مساعدة لدمج أصناف CSS بشكل نظيف
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
