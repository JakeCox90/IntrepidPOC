/**
 * Formats a timestamp into a human-readable relative time string
 * @param timestamp ISO 8601 timestamp string
 * @returns Human-readable relative time string (e.g., "3 mins ago", "2 hours ago", "yesterday")
 */
export const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);

  // Less than a minute
  if (diffInSeconds < 60) {
    return 'just now';
  }

  // Less than an hour
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'min' : 'mins'} ago`;
  }

  // Less than a day
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  // Yesterday
  if (diffInDays === 1) {
    return 'yesterday';
  }

  // Less than a week
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  // Less than a month
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  }

  // More than a month - return the date in a readable format
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}; 