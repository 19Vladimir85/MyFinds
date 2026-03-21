import { data } from 'react-router-dom';
import { supabase } from '../App';
import type { IFind } from '../types';
import { v4 as uuidv4 } from 'uuid';

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
  return data![0] as IFind;
};

export const updateFind = async (index: number, find: IFind) => {
  const { data } = await supabase
    .from('finds')
    .update(find)
    .eq('id', index)
    .select()
    .eq('id', index);
  return data![0] as IFind;
};

export async function uploadFile(file: File) {
  const fileName = uuidv4();
  const { error } = await supabase.storage
    .from('finds-images')
    .upload(fileName, file);
  if (error) {
    // Handle error
  } else {
    const {
      data: { publicUrl },
    } = supabase.storage.from('finds-images').getPublicUrl(fileName);
    return publicUrl;
  }
}
