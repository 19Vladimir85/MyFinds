import type { IDistrict } from '../../types';
import styles from './DistrictPreview.module.css';
import { useFindsDistrictSelector } from '../../store/selectors/useFindsDistrictSelector';
import type { Tab } from '../List/List';

interface IDistrictPreview extends IDistrict {
  onClose: (tab: Tab) => void;
}

export const DistrictPreview: React.FC<IDistrictPreview> = ({
  title,
  description,
  id,
  onClose,
}) => {
  const findsTitles = useFindsDistrictSelector(id!);

  return (
    <div className={styles.distPrev}>
      <div className={styles.info}>{title}</div>
      <div className={styles.info}>{description}</div>
      {findsTitles.map((el, index) => (
        <div key={index + el} className={styles.find}>
          {el}
        </div>
      ))}
      <button onClick={() => onClose('district')}>Х</button>
    </div>
  );
};
