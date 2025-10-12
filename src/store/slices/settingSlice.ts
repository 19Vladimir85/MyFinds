import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Theme } from '../../components/SettingsModal/SettingsModal';
import { LocalStorage } from '../../utils/localStorage';

export type Language = 'En' | 'Ru';

interface ISettings {
  theme: Theme;
  language: Language;
}

const getState = () => {
  const value: ISettings | null = settingsLS.get();
  return value ?? { theme: 'light', language: 'Ru' };
};

const settingsLS = new LocalStorage<ISettings>('settings');
const initialState: ISettings = getState();
const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      settingsLS.set({ ...getState(), theme: action.payload });
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      settingsLS.set({ ...getState(), language: action.payload });
    },
  },
});

export const { setTheme, setLanguage } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
