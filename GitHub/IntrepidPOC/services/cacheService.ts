// A more robust in-memory cache service to store fetched data
type CacheData = {
  data: any
  timestamp: number
}

// Use a global variable to ensure cache persists across component remounts
const globalCache: Map<string, CacheData> = new Map()

class CacheService {
  private static instance: CacheService
  private readonly CACHE_EXPIRY = 5 * 60 * 1000 // 5 minutes in milliseconds

  private constructor() {}

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService()
    }
    return CacheService.instance
  }

  // Set data in cache with a key
  public setData(key: string, data: any): void {
    globalCache.set(key, {
      data,
      timestamp: Date.now(),
    })
  }

  // Get data from cache if it exists and is not expired
  public getData(key: string): any | null {
    const cachedData = globalCache.get(key)

    if (!cachedData) {
      return null
    }

    // Check if cache is expired
    if (Date.now() - cachedData.timestamp > this.CACHE_EXPIRY) {
      globalCache.delete(key)
      return null
    }

    return cachedData.data
  }

  // Check if data exists in cache and is not expired
  public hasData(key: string): boolean {
    return this.getData(key) !== null
  }

  // Clear specific cache entry
  public clearData(key: string): void {
    globalCache.delete(key)
  }

  // Clear all cache
  public clearAllData(): void {
    globalCache.clear()
  }
}

export default CacheService.getInstance()
