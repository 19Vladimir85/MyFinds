import styles from './SettingsModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../store/slices/settingSlice';
import type { RootState } from '../../store/store';
export type Theme = 'light' | 'dark' | 'system';
interface IThemeButton {
  id: Theme;
  name: string;
  onClick: (id: Theme) => void;
  isActive: boolean;
}
const ThemeButton: React.FC<IThemeButton> = ({
  id,
  name,
  onClick,
  isActive,
}) => {
  return (
    <>
      <input
        onClick={() => onClick(id)}
        id={id}
        type="radio"
        name="theme"
        className={styles.themeInput}
        checked={isActive}
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

  const currentTheme = useSelector(
    (state: RootState) => state.settingsReducer.theme
  );

  return (
    <div className={styles.modal}>
      <button onClick={onClick}>X</button>
      <h2 className={styles.title}>Настройки</h2>
      <ThemeButton
        id="light"
        name="Светлая"
        onClick={(id) => onChangeTheme(id)} //полный синтаксис
        isActive={currentTheme === 'light'}
      />
      <ThemeButton
        id="system"
        name="Системная"
        onClick={onChangeTheme}
        isActive={currentTheme === 'system'}
      />
      <ThemeButton
        id="dark"
        name="Темная"
        onClick={onChangeTheme}
        isActive={currentTheme === 'dark'}
      />
    </div>
  );
};
