import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const useFindsDistrictSelector = (id: number) => {
  const finds = useSelector((store: RootState) => store.findReducer.finds);
  return finds.filter((el) => el.districtId === id).map((el) => el.title);
};
