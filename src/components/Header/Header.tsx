import styles from './Header.module.css';
import { useDispatch } from 'react-redux';
import { setOpenModal } from '../../store/slices/appSlice';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.header}>
      <Link to="/">
        <h1>Карта находок</h1>
      </Link>
      <button onClick={() => dispatch(setOpenModal())}>Настройки</button>
      <Link to="/registration">
        <button>Войти</button>
      </Link>
    </div>
  );
};
