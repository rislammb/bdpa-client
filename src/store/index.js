import { createStore, persist } from 'easy-peasy';
import authModel from './authModel';
import committeeModel from './committeeModel';
import pharmacistModel from './pharmacistModel';

const store = createStore({
  pharmacist: persist(pharmacistModel, { allow: ['list', 'details'] }),
  committee: persist(committeeModel, { allow: ['list', 'details'] }),
  auth: persist(authModel, { allow: ['token'] }),
});

export default store;
