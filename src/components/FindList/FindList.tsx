import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { FindPreview } from '../FindPreview/FindPreview';
import styles from './FindList.module.css';

export const FindList: React.FC = () => {
  const findlist = useSelector((store: RootState) => store.findReducer.finds);

  return (
    <div className={styles.list}>
      {Object.keys(findlist).length !== 0 ? (
        Object.values(findlist).map((el) => (
          <FindPreview {...el} key={el.coordinate} />
        ))
      ) : (
        <div>Добавьте находку кликнув на карту</div>
      )}
    </div>
  );
};
