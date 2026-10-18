/**
 * Helper to construct permanent DAM asset URLs as specified in PRD Section 1.4 & 10.5.
 * DCAI recommends object storage + CDN (e.g., Cloudflare R2 / Bunny Storage) with permanent URLs.
 */
export function damUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `https://assets.dcai.example/${cleanPath}`;
}
