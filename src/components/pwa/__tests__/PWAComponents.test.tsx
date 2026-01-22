import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { PWAInstallPrompt } from '@/components/pwa/PWAInstallPrompt';
import { OfflineBadge } from '@/components/pwa/OfflineIndicator';

// Mock usePWA hook
const mockUsePWA = vi.fn();
const mockUseOnlineStatus = vi.fn();

vi.mock('@/hooks/usePWA', () => ({
  usePWA: () => mockUsePWA(),
  useOnlineStatus: () => mockUseOnlineStatus()
}));

describe('PWAInstallPrompt', () => {
  beforeEach(() => {
    localStorage.clear();
    mockUsePWA.mockReturnValue({
      isInstallable: false,
      isInstalled: false,
      promptInstall: vi.fn()
    });
  });

  it('should not render when not installable', () => {
    const { container } = render(<PWAInstallPrompt />);
    expect(container.firstChild).toBeNull();
  });

  it('should not render when already installed', () => {
    mockUsePWA.mockReturnValue({
      isInstallable: true,
      isInstalled: true,
      promptInstall: vi.fn()
    });

    const { container } = render(<PWAInstallPrompt />);
    expect(container.firstChild).toBeNull();
  });
});

describe('OfflineBadge', () => {
  it('should not render when online', () => {
    mockUseOnlineStatus.mockReturnValue(true);
    const { container } = render(<OfflineBadge />);
    expect(container.firstChild).toBeNull();
  });

  it('should render badge when offline', () => {
    mockUseOnlineStatus.mockReturnValue(false);
    const { container } = render(<OfflineBadge />);
    expect(container.textContent).toContain('Offline');
  });
});
