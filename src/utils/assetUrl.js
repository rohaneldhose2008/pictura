/**
 * Bulletproof relative asset URL resolver for local dev, GitHub Pages, and custom domain pictura.au
 */
export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  
  const cleanPath = path.startsWith('./') ? path.slice(2) : path.startsWith('/') ? path.slice(1) : path;
  return `./${cleanPath}`;
};
