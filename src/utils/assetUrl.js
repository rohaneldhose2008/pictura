/**
 * Helper to generate correct asset URLs on both local dev server and GitHub Pages sub-path (/pictura/)
 */
export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = path.startsWith('./') ? path.slice(2) : path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};
