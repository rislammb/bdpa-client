import { action } from 'easy-peasy';

const uiModel = {
  loading: true,
  mode: 'light',
  language: 'BN',
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setMode: action((state) => {
    state.mode = state.mode === 'light' ? 'dark' : 'light';
  }),
  toggleLanguage: action((state) => {
    state.language = state.language === 'BN' ? 'EN' : 'BN';
  }),
};

export default uiModel;
