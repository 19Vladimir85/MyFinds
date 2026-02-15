import type { RootState } from '../../store/store';
import type { IDistrict } from '../../types';
import styles from './DistrictList.module.css';
import { useSelector } from 'react-redux';

const District: React.FC<IDistrict> = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>{title}</div>
      <div className={styles.info}>{description}</div>
    </div>
  );
};

export const DistrictList: React.FC = () => {
  const districts = useSelector(
    (store: RootState) => store.districtReducer.districts,
  );
  return (
    <div className={styles.list}>
      {districts.map((el) => (
        <District key={el.id} {...el} />
      ))}
    </div>
  );
};
