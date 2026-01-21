import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ROIInputs, ROIOutputs, ROICalculation } from '@/types/ai-platforms';

const DEFAULT_INPUTS: ROIInputs = {
  employees: 100,
  averageSalary: 75000,
  adoptionPercentage: 50,
  weeklyProductivityGain: 5,
  annualPlatformCost: 50000,
  trainingCost: 10000,
};

export function useROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>(DEFAULT_INPUTS);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const outputs = useMemo((): ROIOutputs => {
    const hourlyRate = inputs.averageSalary / 2080; // 52 weeks * 40 hours
    const adoptedEmployees = inputs.employees * (inputs.adoptionPercentage / 100);
    const annualProductivityValue = adoptedEmployees * inputs.weeklyProductivityGain * 48 * hourlyRate;
    const totalCost = inputs.annualPlatformCost + inputs.trainingCost;
    const netBenefit = annualProductivityValue - totalCost;
    const roiPercentage = totalCost > 0 ? (netBenefit / totalCost) * 100 : 0;
    const paybackMonths = annualProductivityValue > 0 
      ? (totalCost / (annualProductivityValue / 12)) 
      : Infinity;

    return {
      hourlyRate,
      annualProductivityValue,
      totalCost,
      netBenefit,
      roiPercentage,
      paybackMonths: Math.min(paybackMonths, 999), // Cap at 999 months for display
    };
  }, [inputs]);

  const threeYearProjection = useMemo(() => {
    const years = [1, 2, 3];
    return years.map((year) => {
      // Assume adoption grows by 15% each year (capped at 100%)
      const yearlyAdoption = Math.min(inputs.adoptionPercentage * Math.pow(1.15, year - 1), 100);
      const adoptedEmployees = inputs.employees * (yearlyAdoption / 100);
      const hourlyRate = inputs.averageSalary / 2080;
      const annualProductivity = adoptedEmployees * inputs.weeklyProductivityGain * 48 * hourlyRate;
      
      // Training cost only in year 1, platform cost recurring
      const cost = year === 1 
        ? inputs.annualPlatformCost + inputs.trainingCost 
        : inputs.annualPlatformCost;
      
      const cumulativeCost = year === 1 
        ? cost 
        : cost + (inputs.annualPlatformCost * (year - 1)) + inputs.trainingCost;
      
      const cumulativeBenefit = annualProductivity * year;

      return {
        year,
        adoption: yearlyAdoption,
        productivity: annualProductivity,
        cost,
        cumulativeCost,
        cumulativeBenefit,
        netValue: cumulativeBenefit - cumulativeCost,
      };
    });
  }, [inputs]);

  // Fetch saved calculations
  const { data: savedCalculations = [] } = useQuery({
    queryKey: ['roi-calculations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('roi_calculations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data.map((calc): ROICalculation => ({
        id: calc.id,
        userId: calc.user_id,
        name: calc.name,
        inputs: calc.inputs as unknown as ROIInputs,
        outputs: calc.outputs as unknown as ROIOutputs,
        platformIds: calc.platform_ids || [],
        createdAt: calc.created_at,
      }));
    },
    enabled: !!user,
  });

  // Save calculation mutation
  const saveCalculation = useMutation({
    mutationFn: async ({ name, platformIds = [] }: { name: string; platformIds?: string[] }) => {
      if (!user) throw new Error('Must be logged in');
      
      const { data, error } = await supabase
        .from('roi_calculations')
        .insert([{
          user_id: user.id,
          name,
          inputs: inputs as unknown as Record<string, unknown>,
          outputs: outputs as unknown as Record<string, unknown>,
          platform_ids: platformIds,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roi-calculations'] });
    },
  });

  // Delete calculation mutation
  const deleteCalculation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('roi_calculations')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roi-calculations'] });
    },
  });

  const loadCalculation = (calculation: ROICalculation) => {
    setInputs(calculation.inputs);
  };

  const resetInputs = () => {
    setInputs(DEFAULT_INPUTS);
  };

  const updateInput = <K extends keyof ROIInputs>(key: K, value: ROIInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return {
    inputs,
    outputs,
    threeYearProjection,
    savedCalculations,
    updateInput,
    resetInputs,
    loadCalculation,
    saveCalculation,
    deleteCalculation,
  };
}
