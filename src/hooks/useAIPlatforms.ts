import { useMemo, useState } from 'react';
import { platforms } from '@/data/platformData';
import { AIPlatform, CapabilityKey } from '@/types/ai-platforms';

export interface PlatformFilters {
  search: string;
  categories: string[];
  priorities: string[];
  ecosystems: string[];
  complianceRequired: string[];
}

export function useAIPlatforms(filters: PlatformFilters) {
  const filteredPlatforms = useMemo(() => {
    return platforms.filter((platform) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          platform.name.toLowerCase().includes(searchLower) ||
          platform.verdict.toLowerCase().includes(searchLower) ||
          platform.specialties.some((s) => s.toLowerCase().includes(searchLower)) ||
          platform.targetUsers.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(platform.category)) {
        return false;
      }

      // Priority filter
      if (filters.priorities.length > 0 && !filters.priorities.includes(platform.priority)) {
        return false;
      }

      // Ecosystem filter
      if (filters.ecosystems.length > 0 && !filters.ecosystems.includes(platform.ecosystem)) {
        return false;
      }

      // Compliance filter
      if (filters.complianceRequired.length > 0) {
        const hasRequiredCompliance = filters.complianceRequired.every((req) =>
          platform.compliance.includes(req)
        );
        if (!hasRequiredCompliance) return false;
      }

      return true;
    });
  }, [filters]);

  return { platforms: filteredPlatforms, totalCount: platforms.length };
}

export function usePlatformComparison() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const addPlatform = (platformId: string) => {
    if (selectedPlatforms.length < 4 && !selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  const removePlatform = (platformId: string) => {
    setSelectedPlatforms(selectedPlatforms.filter((id) => id !== platformId));
  };

  const clearComparison = () => {
    setSelectedPlatforms([]);
  };

  const comparisonData = useMemo(() => {
    return selectedPlatforms
      .map((id) => platforms.find((p) => p.id === id))
      .filter((p): p is AIPlatform => p !== undefined);
  }, [selectedPlatforms]);

  return {
    selectedPlatforms,
    comparisonData,
    addPlatform,
    removePlatform,
    clearComparison,
    canAdd: selectedPlatforms.length < 4,
  };
}

export function useCapabilityRanking(capability: CapabilityKey) {
  return useMemo(() => {
    return [...platforms]
      .filter((p) => p.capabilities[capability] > 0)
      .sort((a, b) => b.capabilities[capability] - a.capabilities[capability]);
  }, [capability]);
}

export function getPlatformById(id: string): AIPlatform | undefined {
  return platforms.find((p) => p.id === id);
}

export function getTopPlatformsByCapability(capability: CapabilityKey, limit = 5): AIPlatform[] {
  return [...platforms]
    .filter((p) => p.capabilities[capability] > 0)
    .sort((a, b) => b.capabilities[capability] - a.capabilities[capability])
    .slice(0, limit);
}
