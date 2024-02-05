import { action, thunk } from 'easy-peasy';
import { deleteUser, getUsers, updateUserById } from '../api/user';

const userModel = {
  loading: false,
  submitting: false,
  error: null,
  list: [],
  usersCount: 0,
  totalUsersCount: 0,
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setSubmitting: action((state, payload) => {
    state.submitting = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  setUsers: action((state, payload) => {
    state.list = payload.users;
    state.usersCount = payload.usersCount;
    state.totalUsersCount = payload.totalUsersCount;
  }),
  getUsersData: thunk(async (actions, payload) => {
    actions.setLoading(true);

    try {
      const { data } = await getUsers(payload);
      actions.setUsers(data);
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
    } finally {
      actions.setLoading(false);
    }
  }),
  updateUserData: thunk(async (actions, payload) => {
    actions.setError(null);
    actions.setSubmitting(true);

    try {
      const { data } = await updateUserById(payload);
      return data;
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
    } finally {
      actions.setSubmitting(false);
    }
  }),
  deleteUserData: thunk(async (actions, payload) => {
    actions.setSubmitting(true);

    try {
      await deleteUser(payload);
      actions.getUsersData();
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
    } finally {
      actions.setSubmitting(false);
    }
  }),
};

export default userModel;
