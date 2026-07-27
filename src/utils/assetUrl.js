/**
 * Bulletproof asset URL resolver for local dev, GitHub Pages, and custom domains
 */
export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  
  const cleanPath = path.startsWith('./') ? path.slice(2) : path.startsWith('/') ? path.slice(1) : path;
  
  // Check if running on GitHub Pages (github.io domain)
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    return `/pictura/${cleanPath}`;
  }
  
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
};
