import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

// Define tab names as a type for type safety
export type TabName = 'Today' | 'ForYou' | 'AllNews' | 'Search' | 'Saved';

// Define the shape of tab state for each tab
export interface TabState {
  visited: boolean;
  lastVisited: number | null; // timestamp
  loading: boolean;
  dataFetched: boolean;
  scrollPosition?: number;
}

// Define tab states interface
export interface TabStates {
  [key: string]: TabState;
}

// Define the context interface
interface TabStateContextType {
  tabStates: TabStates;
  activeTab: TabName;
  setActiveTab: (tab: TabName) => void;
  markTabVisited: (tab: TabName) => void;
  markTabLoading: (tab: TabName, isLoading: boolean) => void;
  markTabDataFetched: (tab: TabName) => void;
  saveScrollPosition: (tab: TabName, position: number) => void;
  getTabState: (tab: TabName) => TabState;
  isFirstVisit: (tab: TabName) => boolean;
  shouldRefetchData: (tab: TabName, forceRefresh?: boolean) => boolean;
}

// Create the context with default values
const TabStateContext = createContext<TabStateContextType>({
  tabStates: {},
  activeTab: 'Today',
  setActiveTab: () => {},
  markTabVisited: () => {},
  markTabLoading: () => {},
  markTabDataFetched: () => {},
  saveScrollPosition: () => {},
  getTabState: () => ({ visited: false, lastVisited: null, loading: false, dataFetched: false }),
  isFirstVisit: () => true,
  shouldRefetchData: () => true,
});

// Default tabs to track
const DEFAULT_TABS: TabName[] = ['Today', 'ForYou', 'AllNews', 'Search', 'Saved'];

// Time threshold for data refresh (in milliseconds) - default to 5 minutes
const DATA_REFRESH_THRESHOLD = 5 * 60 * 1000;

// Provider component
export const TabStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize tab states
  const initialTabStates = DEFAULT_TABS.reduce<TabStates>((acc, tab) => {
    acc[tab] = {
      visited: false,
      lastVisited: null,
      loading: false,
      dataFetched: false,
    };
    return acc;
  }, {});

  const [tabStates, setTabStates] = useState<TabStates>(initialTabStates);
  const [activeTab, setActiveTab] = useState<TabName>('Today');

  // Mark tab as visited and update timestamp
  const markTabVisited = useCallback((tab: TabName) => {
    setTabStates(prevStates => ({
      ...prevStates,
      [tab]: {
        ...prevStates[tab],
        visited: true,
        lastVisited: Date.now(),
      },
    }));
  }, []);

  // Update loading state for a tab
  const markTabLoading = useCallback((tab: TabName, isLoading: boolean) => {
    setTabStates(prevStates => ({
      ...prevStates,
      [tab]: {
        ...prevStates[tab],
        loading: isLoading,
      },
    }));
  }, []);

  // Mark tab as having fetched data
  const markTabDataFetched = useCallback((tab: TabName) => {
    setTabStates(prevStates => ({
      ...prevStates,
      [tab]: {
        ...prevStates[tab],
        dataFetched: true,
        loading: false,
      },
    }));
  }, []);

  // Save scroll position for tab
  const saveScrollPosition = useCallback((tab: TabName, position: number) => {
    setTabStates(prevStates => ({
      ...prevStates,
      [tab]: {
        ...prevStates[tab],
        scrollPosition: position,
      },
    }));
  }, []);

  // Get state for a specific tab
  const getTabState = useCallback(
    (tab: TabName): TabState => {
      return tabStates[tab] || initialTabStates[tab];
    },
    [tabStates]
  );

  // Check if this is the first visit to a tab
  const isFirstVisit = useCallback(
    (tab: TabName): boolean => {
      return !tabStates[tab]?.visited;
    },
    [tabStates]
  );

  // Determine whether data should be refetched
  const shouldRefetchData = useCallback(
    (tab: TabName, forceRefresh = false): boolean => {
      if (forceRefresh) return true;
      
      const state = tabStates[tab];
      if (!state?.visited || !state?.dataFetched) return true;
      
      // Check if data is stale based on last visited time
      if (state.lastVisited) {
        const timeSinceLastVisit = Date.now() - state.lastVisited;
        return timeSinceLastVisit > DATA_REFRESH_THRESHOLD;
      }
      
      return false;
    },
    [tabStates]
  );

  // When active tab changes, mark it as visited
  useEffect(() => {
    markTabVisited(activeTab);
  }, [activeTab, markTabVisited]);

  // Context value
  const value = {
    tabStates,
    activeTab,
    setActiveTab,
    markTabVisited,
    markTabLoading,
    markTabDataFetched,
    saveScrollPosition,
    getTabState,
    isFirstVisit,
    shouldRefetchData,
  };

  return <TabStateContext.Provider value={value}>{children}</TabStateContext.Provider>;
};

// Custom hook to use the tab state context
export const useTabState = () => {
  const context = useContext(TabStateContext);
  if (!context) {
    throw new Error('useTabState must be used within a TabStateProvider');
  }
  return context;
};

export default TabStateContext;

