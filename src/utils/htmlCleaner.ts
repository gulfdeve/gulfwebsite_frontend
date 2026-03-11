import DOMPurify from 'isomorphic-dompurify';

export const cleanHtmlForDisplay = (html: string | undefined | null): string => {
  if (!html || typeof html !== 'string') return '';

  // First, sanitize HTML to remove all dangerous content (XSS protection)
  let sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'b', 'i',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a', 'blockquote', 'pre', 'code',
      'div', 'span'
    ],
    ALLOWED_ATTR: ['href', 'title', 'class', "alt", "width", "height"],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'style'],
    FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'onfocus', 'onblur', 'style'],
    ALLOW_ARIA_ATTR: false,
    KEEP_CONTENT: true
  });

  // Then apply formatting cleanup
  let cleaned = sanitized
    // Remove all inline styles (if any remain after sanitization)
    .replace(/style="[^"]*"/gi, '')
    .replace(/style="[^"]*box-sizing[^"]*"/gi, '')
    .replace(/style="[^"]*border[^"]*"/gi, '')
    .replace(/style="[^"]*margin[^"]*"/gi, '')
    .replace(/style="[^"]*padding[^"]*"/gi, '')
    .replace(/style=""/gi, '');

  // Remove cursor spans and invisible characters
  cleaned = cleaned
    .replace(/<span[^>]*class="ql-cursor"[^>]*>.*?<\/span>/gi, '')
    .replace(/<span[^>]*class="ql-cursor"[^>]*\/?>/gi, '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '');

  // Remove empty paragraphs and headings
  cleaned = cleaned
    .replace(/<p><br\s*\/?><\/p>/gi, '')
    .replace(/<p>\s*<\/p>/gi, '')
    .replace(/<h[1-6]><br\s*\/?><\/h[1-6]>/gi, '')
    .replace(/<h[1-6]>\s*<\/h[1-6]>/gi, '');

  // Normalize whitespace
  cleaned = cleaned
    .replace(/\s+/g, ' ')
    .trim();

  // Ensure proper spacing between block elements
  cleaned = cleaned
    .replace(/<\/p>\s*<p>/gi, '</p>\n\n<p>')
    .replace(/<\/h[1-6]>\s*<p>/gi, '</h3>\n\n<p>')
    .replace(/<\/p>\s*<h[1-6]>/gi, '</p>\n\n<h3>');

  // Clean up encoded characters
  cleaned = cleaned
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n');

  return cleaned.trim();
};

export const sanitizeBlogContent = (html: string | undefined | null): string => {
  if (!html || typeof html !== 'string') return '';

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'b', 'i', 's', 'sub', 'sup',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'dl', 'dt', 'dd',
      'a', 'blockquote', 'pre', 'code', 'hr',
      'div', 'span', 'img', 'table', 'thead', 'tbody', 'tr', 'td', 'th'
    ],
    ALLOWED_ATTR: ['href', 'title', 'class', 'src', 'alt', 'width', 'height'],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'style'],
    FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'onfocus', 'onblur', 'style'],
    ALLOW_ARIA_ATTR: false,
    KEEP_CONTENT: true
  });
};

