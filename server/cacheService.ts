// Server-side caching for Gemini API responses

interface CacheItem<T> {
  data: T;
  expiry: number;
}

class ServerCacheService {
  private cache: Map<string, CacheItem<any>>;
  private defaultTTL: number; // Time to live in milliseconds
  private maxSize: number; // Maximum number of items to store in cache

  constructor(defaultTTL: number = 3600000, maxSize: number = 1000) { // Default: 1 hour TTL, 1000 items max
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
    this.maxSize = maxSize;
  }

  /**
   * Get item from cache
   * @param key The cache key
   * @returns The cached item or undefined if not found or expired
   */
  get<T>(key: string): T | undefined {
    const item = this.cache.get(key);
    
    // If item doesn't exist or has expired
    if (!item || item.expiry < Date.now()) {
      if (item) this.cache.delete(key); // Clean up expired items
      return undefined;
    }
    
    return item.data as T;
  }

  /**
   * Set item in cache
   * @param key The cache key
   * @param data The data to cache
   * @param ttl Optional custom TTL in milliseconds
   */
  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    // Enforce cache size limit - if at capacity, remove oldest item
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }
    
    const expiry = Date.now() + ttl;
    this.cache.set(key, { data, expiry });
  }

  /**
   * Check if key exists in cache and is not expired
   * @param key The cache key
   * @returns Boolean indicating if valid cache entry exists
   */
  has(key: string): boolean {
    const item = this.cache.get(key);
    return !!item && item.expiry > Date.now();
  }

  /**
   * Remove item from cache
   * @param key The cache key
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all items from cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get number of items in cache
   * @returns Number of cached items
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Remove all expired items from cache
   * @returns Number of items removed
   */
  cleanup(): number {
    const now = Date.now();
    let count = 0;
    
    // Convert to array to avoid iterator issues
    Array.from(this.cache.entries()).forEach(([key, item]) => {
      if (item.expiry < now) {
        this.cache.delete(key);
        count++;
      }
    });
    
    return count;
  }
}

// Create and export a singleton instance
export const serverCacheService = new ServerCacheService();

// Generate a consistent cache key from request parameters
export function generateServerCacheKey(message: string, language: string, history: any[]): string {
  // Create a string representation of the history - limit to last 3 messages to keep keys shorter
  const recentHistory = history.slice(-3);
  const historyStr = recentHistory.map(msg => `${msg.role}:${msg.content.substring(0, 50)}`).join('|');
  
  // Combine all parameters into a single string and hash it
  return `${message}-${language}-${historyStr}`;
}

// Run periodic cache cleanup every 5 minutes
setInterval(() => {
  const removedCount = serverCacheService.cleanup();
  if (removedCount > 0) {
    console.log(`Cache cleanup: removed ${removedCount} expired items`);
  }
}, 300000); // 5 minutes