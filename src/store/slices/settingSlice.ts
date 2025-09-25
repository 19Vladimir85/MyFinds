import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Theme } from '../../components/SettingsModal/SettingsModal';
import { LocalStorage } from '../../utils/localStorage';

interface ISettings {
  theme: Theme;
}

const settingsLS = new LocalStorage<ISettings>('settings');
const initialState: ISettings = settingsLS.get()
  ? settingsLS.get()
  : { theme: 'light' };
const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      const currentSettings = settingsLS.get() ? settingsLS.get() : {};
      settingsLS.set({ ...currentSettings, theme: action.payload });
    },
  },
});

export const { setTheme } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
