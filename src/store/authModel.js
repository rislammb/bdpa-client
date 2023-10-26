import { action, thunk } from 'easy-peasy';
import { userLogin, verifyToken } from '../api/auth';
import { setAuthToken } from '../api/config';

const authModel = {
  loading: true,
  token: null,
  user: null,
  error: null,
  submitting: false,
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
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
    state.loading = false;
  }),
  getVerifyedData: thunk(async (actions) => {
    actions.setError(null);
    try {
      const { data } = await verifyToken();
      actions.setUser(data);
    } catch (e) {
      if (e.response?.data) {
        actions.setError(e.response?.data);
        actions.setUser(null);
        actions.setToken(null);
        setAuthToken('');
      } else actions.setError(e.message);
      actions.setLoading(false);
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
    state.token = null;
    state.user = null;
    setAuthToken('');
  }),
};

export default authModel;
