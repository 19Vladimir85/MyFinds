import { supabase } from '../App';
import type { IFind } from '../types';

export async function getFinds(): Promise<IFind[]> {
  const { data, error } = await supabase.from('finds').select();
  return data as IFind[];
}

export const addFind = async (find: IFind) => {
  const { data } = await supabase.from('finds').insert([find]).select();
  return data![0] as IFind;
};
// Todo: вернуть одну находку

export const deleteFind = async (index: number) => {
  const { data } = await supabase
    .from('finds')
    .delete()
    .eq('id', index)
    .select();
  return data as IFind[];
};
