import styles from './SettingsModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLanguage,
  setTheme,
  type Language,
} from '../../store/slices/settingSlice';
import type { RootState } from '../../store/store';
import { useTranslation } from 'react-i18next';

export type Theme = 'light' | 'dark' | 'system';
interface ISettingsButton {
  id: Theme | Language;
  name: string;
  onClick: (id: Theme | Language) => void;
  isActive: boolean;
  group: 'Theme' | 'Language';
}
const SettingsButton: React.FC<ISettingsButton> = ({
  id,
  name,
  onClick,
  isActive,
  group,
}) => {
  return (
    <>
      <input
        onClick={() => onClick(id)}
        id={id}
        type="radio"
        name={group}
        className={styles.themeInput}
        defaultChecked={isActive}
      ></input>
      <label
        className={isActive ? styles.activeLabel : styles.Label}
        htmlFor={id}
      >
        {name}
      </label>
    </>
  );
};

interface ISettingsModal {
  onClick: () => void;
}

export const SettingsModal: React.FC<ISettingsModal> = ({ onClick }) => {
  const dispatch = useDispatch();
  const onChangeTheme = (id: Theme) => {
    dispatch(setTheme(id));
  };

  const { t } = useTranslation();

  const onChangeLanguage = (id: Language) => {
    dispatch(setLanguage(id));
  };

  const currentTheme = useSelector(
    (state: RootState) => state.settingsReducer.theme
  );

  const currentLanguage = useSelector(
    (state: RootState) => state.settingsReducer.language
  );

  return (
    <div className={styles.modal}>
      <button className={styles.closeBtn} onClick={onClick}>
        X
      </button>
      <h2 className={styles.title}>Настройки</h2>
      <div className={styles.setting}>
        <SettingsButton
          id="light"
          name="Светлая"
          group="Theme"
          onClick={(id) => onChangeTheme(id as Theme)} //полный синтаксис
          isActive={currentTheme === 'light'}
        />
        <SettingsButton
          id="system"
          name={t('settings.themes.system')}
          group="Theme"
          onClick={(id) => onChangeTheme(id as Theme)}
          isActive={currentTheme === 'system'}
        />
        <SettingsButton
          id="dark"
          name={t('settings.themes.dark')}
          group="Theme"
          onClick={(id) => onChangeTheme(id as Theme)}
          isActive={currentTheme === 'dark'}
        />
      </div>
      <div className={styles.setting}>
        <SettingsButton
          id="ru"
          name="Русский"
          group="Language"
          onClick={(id) => onChangeLanguage(id as Language)}
          isActive={currentLanguage === 'ru'}
        />
        <SettingsButton
          id="en"
          name="Английский"
          group="Language"
          onClick={(id) => onChangeLanguage(id as Language)}
          isActive={currentLanguage === 'en'}
        />
      </div>
    </div>
  );
};
