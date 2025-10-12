import type { IFind } from '../../types';
import styles from './FindPreview.module.css';

export const FindPreview: React.FC<IFind> = ({
  location,
  img,
  title,
  description,
}) => {
  return (
    <div className={styles.findPreview}>
      <img src={img || 'default'} alt={title} />
      <div>{title}</div>
      <div>{location}</div>
      <div>{description}</div>
    </div>
  );
};
