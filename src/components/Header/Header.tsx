import styles from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModal, setUser } from '../../store/slices/appSlice';
import { Link } from 'react-router-dom';
import type { RootState } from '../../store/store';
import { LocalStorage } from '../../utils/localStorage';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isUser = useSelector((store: RootState) => store.appReducer.user);

  const logOut = () => {
    const userLs = new LocalStorage('user');
    userLs.delete();
    dispatch(setUser(null));
  };

  return (
    <div className={styles.header}>
      <Link to="/">
        <h1 className={styles.title}>Карта находок</h1>
      </Link>
      <button onClick={() => dispatch(setOpenModal())}>Настройки</button>
      {isUser ? (
        <button onClick={logOut}>Выйти</button>
      ) : (
        <Link to="/login">
          <button>Войти</button>
        </Link>
      )}
      {isUser && <Link to="/personCabinet">Личный кабинет</Link>}
    </div>
  );
};
