import { createStore, persist } from 'easy-peasy';
import authModel from './authModel';
import committeeModel from './committeeModel';
import pharmacistModel from './pharmacistModel';
import uiModel from './uiModel';

const store = createStore({
  ui: persist(uiModel, { allow: ['mode'], storage: 'localStorage' }),
  auth: persist(authModel, { allow: ['token'], storage: 'localStorage' }),
  pharmacist: persist(pharmacistModel, { allow: ['list', 'details'] }),
  committee: persist(committeeModel, { allow: ['list', 'details'] }),
});

export default store;
