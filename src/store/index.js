import { createStore, persist } from 'easy-peasy';
import committeeModel from './committeeModel';
import pharmacistModel from './pharmacistModel';

const store = createStore({
  pharmacist: persist(pharmacistModel, { allow: ['list', 'details'] }),
  committee: persist(committeeModel, { allow: ['list', 'details'] }),
});

export default store;
