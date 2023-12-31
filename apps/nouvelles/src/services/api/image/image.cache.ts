import { LRUCache } from 'lru-cache';
import { CacheStatus } from './image.type';
import type { CacheConfig } from './image.type';

export const kB = (num: number): number => num * 1e3;

export const mB = (num: number): number => num * 1e6;

export const GB = (num: number): number => num * 1e9;

export interface MemoryCacheConfig extends CacheConfig {
  maxSize: number;
}

export class MemoryCache {
  config: MemoryCacheConfig;
  cache: LRUCache<string, Uint8Array>;

  constructor(config: Partial<MemoryCacheConfig> | null | undefined = {}) {
    this.config = {
      maxSize: config?.maxSize ?? mB(50),
      ttl: config?.ttl ?? 24 * 60 * 60,
      tbd: config?.tbd ?? 365 * 24 * 60 * 60,
    };

    this.cache = new LRUCache<string, Uint8Array>({
      ttl: this.config.ttl,
      allowStale: true,
      updateAgeOnGet: true,
      maxSize: this.config.maxSize,
      sizeCalculation: (value) => value.byteLength,
    });
  }

  status(key: string) {
    return this.cache.has(key) ? CacheStatus.HIT : CacheStatus.MISS;
  }

  has(key: string) {
    return this.cache.has(key);
  }

  get(key: string): Uint8Array | null {
    return this.cache.get(key) ?? null;
  }

  set(key: string, resultImg: Uint8Array) {
    this.cache.set(key, resultImg, {
      size: resultImg.byteLength,
    });
  }

  clear() {
    this.cache.clear();
  }
}
