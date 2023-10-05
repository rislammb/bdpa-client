import { action } from 'easy-peasy';

const uiModel = {
  mode: 'light',
  setMode: action((state) => {
    state.mode = state.mode === 'light' ? 'dark' : 'light';
  }),
};

export default uiModel;
