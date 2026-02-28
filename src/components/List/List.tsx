import { useState } from 'react';
import { FindList } from '../FindList/FindList';
import style from './List.module.css';
import cn from 'clsx';
import { DistrictList } from '../DistrictList/DistrictList';

interface IList {
  onClick: (coordinate: string) => void;
  onDistrictClick: (id: number) => void;
  initialTab: Tab;
}

export type Tab = 'find' | 'district';

export const List: React.FC<IList> = ({
  onClick,
  onDistrictClick,
  initialTab,
}) => {
  const [activeTab, setActivTab] = useState<Tab>(initialTab || 'find');

  const onChange = (activeTab: Tab) => {
    setActivTab(activeTab);
  };
  return (
    <div className={style.wrapper}>
      <button
        className={cn(style.tab, { [style.active]: activeTab === 'find' })}
        onClick={() => onChange('find')}
      >
        Находки
      </button>
      <button
        className={cn(style.tab, { [style.active]: activeTab === 'district' })}
        onClick={() => onChange('district')}
      >
        Подборки
      </button>
      <div className={style.list}>
        {activeTab === 'find' && <FindList onClick={onClick}></FindList>}
        {activeTab === 'district' && <DistrictList onClick={onDistrictClick} />}
      </div>
    </div>
  );
};
