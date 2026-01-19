import { useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ShortcutConfig {
  key: string;
  action: () => void;
  description: string;
  requiresAuth?: boolean;
}

export function useKeyboardShortcuts() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isInputFocused = useCallback(() => {
    const activeElement = document.activeElement;
    if (!activeElement) return false;
    
    const tagName = activeElement.tagName.toLowerCase();
    const isEditable = activeElement.getAttribute('contenteditable') === 'true';
    const isInput = tagName === 'input' || tagName === 'textarea' || tagName === 'select';
    
    return isInput || isEditable;
  }, []);

  const shortcuts: ShortcutConfig[] = useMemo(() => [
    {
      key: 'n',
      action: () => {
        if (location.pathname.includes('/knowledge')) {
          navigate('/knowledge/new');
        } else if (location.pathname.includes('/dashboard')) {
          // Trigger new profile dialog - dispatch custom event
          window.dispatchEvent(new CustomEvent('shortcut:new-profile'));
        } else {
          navigate('/knowledge/new');
        }
      },
      description: 'Create new item',
      requiresAuth: true,
    },
    {
      key: 'e',
      action: () => {
        // Trigger edit mode - dispatch custom event
        window.dispatchEvent(new CustomEvent('shortcut:edit'));
      },
      description: 'Edit current item',
      requiresAuth: true,
    },
    {
      key: '/',
      action: () => {
        // Focus search input
        const searchInput = document.querySelector('[data-search-input]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      },
      description: 'Focus search',
      requiresAuth: false,
    },
    {
      key: 'g',
      action: () => {
        // Go to shortcuts - wait for next key
        window.dispatchEvent(new CustomEvent('shortcut:go-mode'));
      },
      description: 'Go to...',
      requiresAuth: false,
    },
    {
      key: 'h',
      action: () => navigate('/'),
      description: 'Go home',
      requiresAuth: false,
    },
    {
      key: 'd',
      action: () => navigate('/dashboard'),
      description: 'Go to dashboard',
      requiresAuth: true,
    },
    {
      key: 'k',
      action: () => navigate('/knowledge'),
      description: 'Go to knowledge base',
      requiresAuth: true,
    },
    {
      key: 'a',
      action: () => navigate('/analytics'),
      description: 'Go to analytics',
      requiresAuth: true,
    },
    {
      key: 'Escape',
      action: () => {
        // Blur any focused element
        (document.activeElement as HTMLElement)?.blur();
        window.dispatchEvent(new CustomEvent('shortcut:escape'));
      },
      description: 'Cancel/Close',
      requiresAuth: false,
    },
    {
      key: '?',
      action: () => {
        window.dispatchEvent(new CustomEvent('shortcut:show-help'));
      },
      description: 'Show keyboard shortcuts',
      requiresAuth: false,
    },
  ], [navigate, location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if command palette is open (Cmd+K)
      if (e.metaKey || e.ctrlKey) return;
      
      // Skip if input is focused (except for Escape)
      if (isInputFocused() && e.key !== 'Escape') return;

      const shortcut = shortcuts.find(s => s.key.toLowerCase() === e.key.toLowerCase());
      
      if (shortcut) {
        // Check auth requirement
        if (shortcut.requiresAuth && !user) return;
        
        e.preventDefault();
        shortcut.action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [user, shortcuts, isInputFocused]);

  return { shortcuts };
}
