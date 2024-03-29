import { createStore, persist } from 'easy-peasy';
import authModel from './authModel';
import committeeModel from './committeeModel';
import memberModel from './memberModel';
import pharmacistModel from './pharmacistModel';
import uiModel from './uiModel';
import userModel from './userModel';

const store = createStore({
  ui: persist(uiModel, {
    allow: ['mode', 'language'],
    storage: 'localStorage',
  }),
  auth: persist(authModel, { allow: ['token'], storage: 'localStorage' }),
  pharmacist: persist(pharmacistModel, { allow: ['list', 'details'] }),
  committee: persist(committeeModel, { allow: ['list', 'details'] }),
  member: memberModel,
  user: persist(userModel, { allow: ['list'] }),
});

export default store;
