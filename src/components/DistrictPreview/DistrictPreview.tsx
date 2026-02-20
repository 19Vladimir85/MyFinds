import type { IDistrict } from '../../types';
import styles from './DistrictPreview.module.css';
import { useFindsDistrictSelector } from '../../store/selectors/useFindsDistrictSelector';

export const DistrictPreview: React.FC<IDistrict> = ({
  title,
  description,
  id,
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
    </div>
  );
};
