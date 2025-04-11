# Content Caching in the Application

This document outlines the caching solution implemented in the application to improve user experience by avoiding unnecessary loading states when returning to previously viewed content.

## Overview

The caching system consists of:

1. A global cache service (`services/cacheService.ts`)
2. A custom hook for easy integration (`hooks/useContentCache.ts`)

## Cache Service

The cache service provides the following functionality:

- `setCache<T>(key, data, expiration?)`: Store data in the cache
- `getCache<T>(key)`: Retrieve data from the cache
- `hasCache(key)`: Check if data exists in the cache
- `removeCache(key)`: Remove data from the cache
- `clearCache()`: Clear all data from the cache
- `getCacheKeys()`: Get all keys in the cache

By default, cached items expire after 24 hours.

## Content Cache Hook

The `useContentCache` hook provides a simple way to integrate caching into components:

```tsx
const { data, loading, error, setData } = useContentCache(
  'cache-key',
  () => fetchData(),
  initialData,
  { expiration: 3600000, skipCache: false }
);
```

### Parameters

- `cacheKey`: Unique identifier for the cached content
- `fetchData`: Function to fetch data if not in cache
- `initialData`: Initial data to use if available
- `options`: Additional options for caching
  - `expiration`: Custom expiration time in milliseconds
  - `skipCache`: Whether to skip caching (default: false)

### Return Values

- `data`: The cached or fetched data
- `loading`: Whether the data is currently loading
- `error`: Any error that occurred during fetching
- `setData`: Function to manually update the data

## Usage Examples

### Basic Usage

```tsx
const { data, loading, error } = useContentCache(
  `article_${articleId}`,
  () => fetchArticleById(articleId),
  initialArticle
);

if (loading) return <SkeletonLoader />;
if (error) return <ErrorMessage error={error} />;
return <ArticleContent article={data} />;
```

### With Custom Expiration

```tsx
const { data, loading } = useContentCache(
  `user_${userId}`,
  () => fetchUserProfile(userId),
  null,
  { expiration: 3600000 } // 1 hour
);
```

### Skipping Cache

```tsx
const { data, loading } = useContentCache(
  `search_${query}`,
  () => performSearch(query),
  null,
  { skipCache: true } // Don't cache search results
);
```

## Best Practices

1. Use meaningful cache keys that include the type of content and a unique identifier
2. Set appropriate expiration times based on how frequently the data changes
3. Consider using the `skipCache` option for data that shouldn't be cached (e.g., search results)
4. Use the `initialData` parameter when you already have some data from props or route params

## Implementation Details

The cache is stored in memory, which means it will be cleared when the app is restarted. For persistent caching, consider using AsyncStorage or another storage solution. 