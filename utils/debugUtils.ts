import { debugCache } from '../services/cacheService';

/**
 * Debug utility to help troubleshoot caching issues
 * 
 * This function logs the current state of the cache and provides
 * information about the navigation state.
 * 
 * @param componentName - The name of the component being debugged
 * @param props - The props passed to the component
 */
export const debugNavigation = (componentName: string, props: any): void => {
  console.log(`[DEBUG] ${componentName} rendered with props:`, props);
  console.log(`[DEBUG] ${componentName} route params:`, props.route?.params);
  console.log(`[DEBUG] ${componentName} navigation state:`, props.navigation?.getState());
  
  // Log the current state of the cache
  debugCache();
};

export default {
  debugNavigation,
}; 