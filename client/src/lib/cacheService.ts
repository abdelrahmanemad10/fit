// Simple in-memory response caching system for API responses

interface CacheItem<T> {
  data: T;
  expiry: number;
}

class CacheService {
  private cache: Map<string, CacheItem<any>>;
  private defaultTTL: number; // Time to live in milliseconds

  constructor(defaultTTL: number = 3600000) { // Default TTL: 1 hour
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
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
export const cacheService = new CacheService();

// Generate a consistent cache key from request parameters
export function generateCacheKey(message: string, language: string, history: any[]): string {
  // Create a string representation of the history - limit to last 3 messages to keep keys shorter
  const recentHistory = history.slice(-3);
  const historyStr = recentHistory.map(msg => `${msg.role}:${msg.content.substring(0, 50)}`).join('|');
  
  // Combine all parameters into a single string
  return `${message}-${language}-${historyStr}`;
}