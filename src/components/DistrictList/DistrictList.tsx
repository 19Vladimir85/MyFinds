import type { IDistrict } from '../../types';
import styles from './DistrictList.module.css';

const District: React.FC<IDistrict> = ({ name, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>{name}</div>
      <div className={styles.info}>{description}</div>
    </div>
  );
};

export const DistrictList: React.FC = () => {
  const districts: IDistrict[] = [
    {
      id: 1,
      name: 'Пермский край',
      description:
        'Много медных старообряжческих крестов и украшений с пермским звериным стилем',
    },
    {
      id: 2,
      name: 'Урал',
      description: 'Много медных старообрядческих крестов и малахита',
    },
    { id: 3, name: 'ХМАО', description: 'Черное золото' },
  ];
  return (
    <div className={styles.list}>
      {districts.map((el) => (
        <District key={el.id} {...el} />
      ))}
    </div>
  );
};
