import { action, thunk } from 'easy-peasy';
import { userLogin, verifyToken } from '../api/auth';
import { setAuthToken } from '../api/config';

const authModel = {
  token: null,
  user: null,
  error: null,
  setToken: action((state, payload) => {
    state.token = payload;
  }),
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  getVerifyedData: thunk(async (actions) => {
    try {
      const { data } = await verifyToken();
      actions.setUser(data);
      actions.setError(null);
    } catch (e) {
      actions.setError(e.response?.data);
      actions.setToken(null);
      setAuthToken(null);
    }
  }),
  getAuthData: thunk(async (actions, payload) => {
    actions.setError(null);
    try {
      const {
        data: { token },
      } = await userLogin(payload);
      actions.setToken(token);
      setAuthToken(token);
    } catch (e) {
      actions.setError(e.response?.data);
    }
  }),
};

export default authModel;
