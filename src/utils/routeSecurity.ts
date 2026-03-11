export const VALID_LOCALES = ['en', 'fr', 'es'] as const;
export type ValidLocale = typeof VALID_LOCALES[number];

export const validateLocale = (locale: string | undefined | null): ValidLocale => {
  if (!locale || typeof locale !== 'string') return 'en';
  const lowerLocale = locale.toLowerCase().trim();
  return VALID_LOCALES.includes(lowerLocale as ValidLocale) ? (lowerLocale as ValidLocale) : 'en';
};

export const sanitizePathSegment = (segment: string): string => {
  if (!segment || typeof segment !== 'string') return '';
  // Only allow alphanumeric, hyphens, underscores, and dots (for file extensions)
  const sanitized = segment.replace(/[^a-zA-Z0-9._-]/g, '');
  // Prevent path traversal attempts
  if (sanitized.includes('..') || sanitized.includes('//')) return '';
  // Limit length to prevent DoS
  return sanitized.substring(0, 200);
};

export const sanitizePathSegments = (segments: string[]): string[] => {
  return segments
    .map(sanitizePathSegment)
    .filter(segment => segment.length > 0 && !segment.includes('..'));
};

export const buildSafeRoute = (segments: string[], locale?: string): string => {
  const sanitizedSegments = sanitizePathSegments(segments);
  const validatedLocale = locale ? validateLocale(locale) : null;
  
  if (validatedLocale) {
    // Ensure first segment is locale
    if (sanitizedSegments[0] && VALID_LOCALES.includes(sanitizedSegments[0] as ValidLocale)) {
      sanitizedSegments[0] = validatedLocale;
    } else {
      sanitizedSegments.unshift(validatedLocale);
    }
  }
  
  return '/' + sanitizedSegments.join('/');
};

export const ALLOWED_QUERY_KEYS = [
  'type',
  'for',
  'location',
  'area',
  'minPrice',
  'maxPrice',
  'priceRange',
  'page',
  'limit',
  'handoverDate',
  'minBeds',
  'maxBeds',
  'minBaths',
  'maxBaths',
  'bedrooms',
  'lifestyle',
  'title',
  'developer',
  'offeringType',
  'propertyRange',
  'locale',
  'excludeContent',
  'admin'
] as const;

export type AllowedQueryKey = typeof ALLOWED_QUERY_KEYS[number];

export const isValidQueryKey = (key: string): key is AllowedQueryKey => {
  return ALLOWED_QUERY_KEYS.includes(key as AllowedQueryKey);
};

export const sanitizeQueryValue = (value: any, maxLength: number = 100): string => {
  if (value === null || value === undefined || value === '') return '';
  
  const stringValue = String(value);
  // Remove dangerous characters that could be used for XSS or injection
  const sanitized = stringValue
    .replace(/[<>'"&]/g, '') // Remove HTML/script injection characters
    .replace(/[{}[\]\\]/g, '') // Remove JSON/object injection characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .trim();
  
  // Limit length to prevent DoS
  return sanitized.substring(0, maxLength);
};

export const buildSafeQueryString = (filters: Record<string, any>): string => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    // Only process allowed keys
    if (!isValidQueryKey(key)) return;
    
    // Skip empty/null/undefined values
    if (value === null || value === undefined || value === '' || value === 0) return;
    
    // Sanitize value
    const sanitizedValue = sanitizeQueryValue(value);
    if (sanitizedValue) {
      params.append(key, sanitizedValue);
    }
  });
  
  return params.toString();
};

export const buildSafeUrl = (path: string, queryString?: string): string => {
  // Ensure path starts with /
  const safePath = path.startsWith('/') ? path : '/' + path;
  const safeQuery = queryString ? `?${queryString}` : '';
  return safePath + safeQuery;
};

