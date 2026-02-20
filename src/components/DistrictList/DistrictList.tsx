import type { RootState } from '../../store/store';
import type { IDistrict } from '../../types';
import styles from './DistrictList.module.css';
import { useSelector } from 'react-redux';
interface IDistrictList {
  onClick: (id: number) => void;
}
const District: React.FC<IDistrict & IDistrictList> = ({
  title,
  description,
  onClick,
  id,
}) => {
  return (
    <div onClick={() => onClick(id!)} className={styles.card}>
      <div className={styles.info}>{title}</div>
      <div className={styles.info}>{description}</div>
    </div>
  );
};

export const DistrictList: React.FC<IDistrictList> = ({ onClick }) => {
  const districts = useSelector(
    (store: RootState) => store.districtReducer.districts,
  );

  return (
    <div className={styles.list}>
      {districts.map((el) => (
        <District onClick={onClick} key={el.id} {...el} />
      ))}
    </div>
  );
};
