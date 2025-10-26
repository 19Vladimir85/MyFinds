import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store/store';
import styles from './App.module.css';
import { setOpenModal } from './store/slices/appSlice';
import { SettingsModal } from './components/SettingsModal/SettingsModal';
import cn from 'clsx';
import { Header } from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './Pages/mainPage/mainPage';
import { RegistrationPage } from './Pages/registrationPage/RegistrationPage';

function App() {
  const openModal = useSelector(
    (store: RootState) => store.appReducer.openModal
  );

  const theme = useSelector((store: RootState) => store.settingsReducer.theme);

  const dispatch = useDispatch();

  return (
    <div
      className={cn(styles.body, {
        [styles.light]: theme === 'light',
        [styles.dark]: theme === 'dark',
      })}
    >
      <Header />
      {openModal && <SettingsModal onClick={() => dispatch(setOpenModal())} />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </div>
  );
}

export default App;
