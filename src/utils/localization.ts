export function getLocalizedValue(
  value: any,
  currentLocale: string,
  fallback: string = ''
): string {
  if (typeof value === 'string') return value;
  
  if (typeof value === 'object' && value !== null) {
    // Try exact locale match first (e.g., 'en-US')
    if (value[currentLocale]) return value[currentLocale];
    
    // Try language code (e.g., 'en' from 'en-US')
    const langKey = currentLocale?.split('-')[0] || 'en';
    if (value[langKey]) return value[langKey];
    
    // Fallback to common locales in order
    if (value.en) return value.en;
    if (value.fr) return value.fr;
    if (value.es) return value.es;
    
    // Try any available key
    const firstKey = Object.keys(value)[0];
    if (firstKey && typeof value[firstKey] === 'string') {
      return value[firstKey];
    }
  }
  
  return String(value || fallback);
}

export function getSlug(
  slug: any,
  currentLocale: string,
  fallbackId?: string
): string {
  const slugValue = getLocalizedValue(slug, currentLocale, '');
  return slugValue || fallbackId || '';
}
