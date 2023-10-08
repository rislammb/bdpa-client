import { action } from 'easy-peasy';

const uiModel = {
  mode: 'light',
  language: 'BN',
  setMode: action((state) => {
    state.mode = state.mode === 'light' ? 'dark' : 'light';
  }),
  setLanguage: action((state, payload) => {
    state.language = payload;
  }),
};

export default uiModel;
