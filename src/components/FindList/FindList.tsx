import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { FindPreview } from '../FindPreview/FindPreview';
import styles from './FindList.module.css';

interface IFindList {
  onClick: (coordinate: string) => void;
}
export const FindList: React.FC<IFindList> = ({ onClick }) => {
  const findlist = useSelector((store: RootState) => store.findReducer.finds);

  return (
    <div className={styles.list}>
      {Object.keys(findlist).length !== 0 ? (
        Object.values(findlist).map((el) => (
          <FindPreview onClick={onClick} {...el} key={el.id} />
        ))
      ) : (
        <div>Добавьте находку кликнув на карту</div>
      )}
    </div>
  );
};
