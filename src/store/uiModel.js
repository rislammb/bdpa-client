import { action } from 'easy-peasy';

const uiModel = {
  mode: 'light',
  language: 'BN',
  setMode: action((state) => {
    state.mode = state.mode === 'light' ? 'dark' : 'light';
  }),
  toggleLanguage: action((state) => {
    state.language = state.language === 'BN' ? 'EN' : 'BN';
  }),
};

export default uiModel;
