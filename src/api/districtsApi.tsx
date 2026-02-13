import { supabase } from '../App';
import type { IDistrict } from '../types';

export const addDistrict = async (district: IDistrict) => {
  const { data } = await supabase.from('districts').insert([district]).select();
  return data![0] as IDistrict;
};

export const getDistrict = async () => {
  const { data } = await supabase.from('districts').select();
  return data as IDistrict[];
};
