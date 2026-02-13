import type { IDistrict } from '../../types';
import styles from './DistrictList.module.css';
import { addDistrictThunk } from '../../store/thunk/districtThunk';
import { useDispatch } from 'react-redux';
import { store } from '../../store/store';

const District: React.FC<IDistrict> = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>{title}</div>
      <div className={styles.info}>{description}</div>
    </div>
  );
};

export const DistrictList: React.FC = () => {
  const districts: IDistrict[] = [
    {
      id: 1,
      title: 'Пермский край',
      description:
        'Много медных старообряжческих крестов и украшений с пермским звериным стилем',
    },
    {
      id: 2,
      title: 'Урал',
      description: 'Много медных старообрядческих крестов и малахита',
    },
    { id: 3, title: 'ХМАО', description: 'Черное золото' },
  ];

  type AppDispatch = typeof store.dispatch;

  const dispatch = useDispatch<AppDispatch>();

  const addDistrict = () => {
    dispatch(addDistrictThunk(districts[1]));
  };

  return (
    <>
      <button onClick={addDistrict}>Добавить район</button>
      <div className={styles.list}>
        {districts.map((el) => (
          <District key={el.id} {...el} />
        ))}
      </div>
    </>
  );
};
