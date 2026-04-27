import { supabase } from '../../config/supabase';

export interface IRule {
  id: string;
  name: string;
  logic: string; // e.g. "amount > 5000"
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  isActive: boolean;
  weight: number;
}

export const getActiveRules = async (): Promise<IRule[]> => {
  const { data, error } = await supabase
    .from('rules')
    .select('*')
    .eq('isActive', true);

  if (error) {
    console.error('Error fetching rules:', error);
    return [];
  }

  return data || [];
};
