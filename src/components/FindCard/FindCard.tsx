import type { IFind } from '../../types';
import styles from './FindCard.module.css';

export const FindCard: React.FC<IFind> = ({
  coordinate,
  img,
  title,
  description,
}) => {
  return (
    <div className={styles.findCard}>
      <img src={img} alt={title} />
      <div>{title}</div>
      <div>{coordinate}</div>
      <div>{description}</div>
    </div>
  );
};
