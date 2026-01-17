import type { IFind } from '../../types';
import styles from './FindPreview.module.css';

interface IFindPreview extends IFind {
  onClick: (coordinate: string) => void;
}

export const FindPreview: React.FC<IFindPreview> = ({
  location,
  coordinate,
  img,
  title,
  description,
  onClick,
}) => {
  return (
    <div onClick={() => onClick(coordinate)} className={styles.findPreview}>
      <img src={img || 'default'} alt={title} />
      <div>{title}</div>
      <div>{location}</div>
      <div>{description}</div>
    </div>
  );
};
