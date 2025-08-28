import type { IFind } from '../../types';
import styles from './FindPreview.module.css';

export const FindPreview: React.FC<IFind> = ({
  coordinate,
  img,
  title,
  description,
}) => {
  return (
    <div className={styles.findPreview}>
      <img src={img} alt={title} />
      <div>{title}</div>
      <div>{coordinate}</div>
      <div>{description}</div>
    </div>
  );
};
