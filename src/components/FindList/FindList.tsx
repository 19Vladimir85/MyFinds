import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { FindPreview } from '../FindPreview/FindPreview';
import styles from './FindList.module.css';

export const FindList: React.FC = () => {
  const findlist = useSelector((store: RootState) => store.findReducer.finds);

  return (
    <div className={styles.list}>
      {Object.values(findlist).map((el) => (
        <FindPreview {...el} />
      ))}
    </div>
  );
};
