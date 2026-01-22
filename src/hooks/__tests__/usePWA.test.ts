import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Mock the virtual:pwa-register/react module
vi.mock('virtual:pwa-register/react', () => ({
  useRegisterSW: vi.fn(() => ({
    needRefresh: [false, vi.fn()],
    offlineReady: [false, vi.fn()],
    updateServiceWorker: vi.fn()
  }))
}));

import { useOnlineStatus } from '@/hooks/usePWA';

describe('useOnlineStatus', () => {
  beforeEach(() => {
    Object.defineProperty(global.navigator, 'onLine', {
      value: true,
      writable: true,
      configurable: true
    });
  });

  it('should return true when online', () => {
    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(true);
  });

  it('should update when going offline', () => {
    const { result } = renderHook(() => useOnlineStatus());
    
    act(() => {
      Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
      window.dispatchEvent(new Event('offline'));
    });
    
    expect(result.current).toBe(false);
  });
});
