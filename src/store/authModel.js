import { action, thunk } from 'easy-peasy';
import {
  resendEmail,
  setPassword,
  userLogin,
  userRegistration,
  verifyEmail,
  verifyToken,
} from '../api/auth';
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
    state.submitting = false;
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
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
      actions.setSubmitting(false);
    }
  }),
  getRegistrationData: thunk(async (actions, payload) => {
    actions.setSubmitting(true);
    actions.setError(null);

    try {
      const { data } = await userRegistration(payload);
      actions.setSubmitting(false);
      return data;
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
      actions.setSubmitting(false);
    }
  }),
  resendEmailData: thunk(async (actions, payload) => {
    actions.setSubmitting(true);
    actions.setError(null);

    try {
      const { data } = await resendEmail(payload);
      actions.setSubmitting(false);
      return data;
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
      actions.setSubmitting(false);
    }
  }),
  emailVerification: thunk(async (actions, payload) => {
    actions.setSubmitting(true);
    actions.setError(null);

    try {
      const { data } = await verifyEmail(payload);
      actions.setSubmitting(false);
      return data;
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
      actions.setSubmitting(false);
    }
  }),
  setPasswordData: thunk(async (actions, payload) => {
    actions.setSubmitting(true);
    actions.setError(null);

    try {
      const { data } = await setPassword(payload);

      actions.setToken(data?.token);
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
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
