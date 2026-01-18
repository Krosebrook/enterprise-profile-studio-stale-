import { useState, useEffect, useCallback } from 'react';

const SEARCH_HISTORY_KEY = 'knowledge-search-history';
const RECENT_DOCS_KEY = 'knowledge-recent-documents';
const MAX_HISTORY_ITEMS = 10;
const MAX_RECENT_DOCS = 5;

interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

interface RecentDocItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  timestamp: number;
}

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [recentDocs, setRecentDocs] = useState<RecentDocItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      
      const savedRecent = localStorage.getItem(RECENT_DOCS_KEY);
      if (savedRecent) {
        setRecentDocs(JSON.parse(savedRecent));
      }
    } catch (e) {
      console.error('Failed to load search history:', e);
    }
  }, []);

  // Add search query to history
  const addToHistory = useCallback((query: string) => {
    if (!query.trim() || query.length < 2) return;
    
    setHistory(prev => {
      // Remove duplicate if exists
      const filtered = prev.filter(item => 
        item.query.toLowerCase() !== query.toLowerCase()
      );
      
      // Add new item at the beginning
      const newHistory = [
        { query: query.trim(), timestamp: Date.now() },
        ...filtered
      ].slice(0, MAX_HISTORY_ITEMS);
      
      // Save to localStorage
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      
      return newHistory;
    });
  }, []);

  // Add document to recent docs
  const addToRecentDocs = useCallback((doc: {
    id: string;
    slug: string;
    title: string;
    category: string;
  }) => {
    setRecentDocs(prev => {
      // Remove duplicate if exists
      const filtered = prev.filter(item => item.id !== doc.id);
      
      // Add new item at the beginning
      const newRecent = [
        { ...doc, timestamp: Date.now() },
        ...filtered
      ].slice(0, MAX_RECENT_DOCS);
      
      // Save to localStorage
      localStorage.setItem(RECENT_DOCS_KEY, JSON.stringify(newRecent));
      
      return newRecent;
    });
  }, []);

  // Remove item from history
  const removeFromHistory = useCallback((query: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(item => item.query !== query);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  // Clear all history
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  }, []);

  // Clear recent docs
  const clearRecentDocs = useCallback(() => {
    setRecentDocs([]);
    localStorage.removeItem(RECENT_DOCS_KEY);
  }, []);

  return {
    history,
    recentDocs,
    addToHistory,
    addToRecentDocs,
    removeFromHistory,
    clearHistory,
    clearRecentDocs,
  };
}
