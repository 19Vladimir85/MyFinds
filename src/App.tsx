import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store/store';
import styles from './App.module.css';
import { setOpenModal } from './store/slices/appSlice';
import { SettingsModal } from './components/SettingsModal/SettingsModal';
import cn from 'clsx';
import { Header } from './components/Header/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from './Pages/mainPage/MainPage';
import { RegistrationPage } from './Pages/registrationPage/RegistrationPage';
import { PersonCabinet } from './Pages/PersonCabinet/PersonCabinet';
import { LoginPage } from './Pages/LoginPage/LoginPage';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store: RootState) => store.appReducer.user);
  return user ? children : <Navigate to="/registration" replace />;
};

function App() {
  const [instruments, setInstruments] = useState([]);
  useEffect(() => {
    getInstruments();
  }, []);
  async function getInstruments() {
    const { data } = await supabase.from('finds').select();
    setInstruments(data);
  }

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
        <Route
          path="/personCabinet"
          element={
            <ProtectedRoute>
              <PersonCabinet />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
