export interface CacheConfig {
  /**
   * Time To Live: how long a key should remain in the cache
   */
  ttl: number;
  /**
   * Time Before Deletion: how long a key should remain in the cache after expired (ttl)
   */
  tbd: number;
}

export enum CacheStatus {
  /**
   * The cache contains the key and it has not yet expired
   */
  HIT = 'hit',
  /**
   * The cache contains the key but it has expired
   */
  STALE = 'stale',
  /**
   * The cache does not contain the key
   */
  MISS = 'miss',
}

export enum MimeType {
  SVG = 'image/svg+xml',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  WEBP = 'image/webp',
  BMP = 'image/bmp',
  TIFF = 'image/tiff',
  AVIF = 'image/avif',
}
