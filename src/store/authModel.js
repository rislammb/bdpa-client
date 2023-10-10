import { action, thunk } from 'easy-peasy';
import { userLogin, verifyToken } from '../api/auth';
import { setAuthToken } from '../api/config';

const authModel = {
  token: null,
  user: null,
  error: null,
  submitting: false,
  setSubmitting: action((state, payload) => {
    state.submitting = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  setToken: action((state, payload) => {
    state.token = payload;
  }),
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  getVerifyedData: thunk(async (actions) => {
    actions.setError(null);
    console.log('start token verification');
    try {
      const { data } = await verifyToken();
      actions.setUser(data);
    } catch (e) {
      actions.setError(e.response?.data);
      actions.setToken(null);
      actions.setUser(null);
      setAuthToken(null);
    }
  }),
  getLoginData: thunk(async (actions, payload) => {
    actions.setSubmitting(true);
    actions.setError(null);
    try {
      const { data } = await userLogin(payload);

      actions.setToken(data?.token);
      setAuthToken(data?.token);
      actions.setSubmitting(false);
    } catch (e) {
      actions.setError(e.response?.data);
      actions.setSubmitting(false);
    }
  }),
  logout: action((state) => {
    console.log('start log out');
    state.token = null;
    state.user = null;
    setAuthToken();
  }),
};

export default authModel;
