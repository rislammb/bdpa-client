import { action, thunk } from 'easy-peasy';
import {
  addCommittee,
  deleteCommittee,
  getCommittees,
  getDetailsCommittee,
  getDetailsCommitteeById,
  updateCommitteeByPath,
} from '../api/committee';

const committeeModel = {
  loading: false,
  submitting: false,
  error: null,
  list: [],
  committeesCount: 0,
  totalCommitteesCount: 0,
  details: null,
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setSubmitting: action((state, payload) => {
    state.submitting = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  setCommittees: action((state, payload) => {
    state.list = payload.committees;
    state.committeesCount = payload.committeesCount;
    state.totalCommitteesCount = payload.totalCommitteesCount;
  }),
  getCommitteesData: thunk(async (actions, payload) => {
    actions.setError(null);
    actions.setLoading(true);

    try {
      const { data } = await getCommittees(payload);
      actions.setCommittees(data);
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
    } finally {
      actions.setLoading(false);
    }
  }),
  setDetailsCommittee: action((state, payload) => {
    state.details = payload;
  }),
  getDetailsCommitteeData: thunk(async (actions, payload) => {
    actions.setDetailsCommittee(null);
    actions.setLoading(true);
    actions.setError(null);

    try {
      const { data } = await getDetailsCommittee(payload);
      actions.setDetailsCommittee(data);
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
    } finally {
      actions.setLoading(false);
    }
  }),
  getDetailsCommitteeDataById: thunk(async (actions, payload) => {
    actions.setDetailsCommittee(null);
    actions.setLoading(true);
    actions.setError(null);

    try {
      const { data } = await getDetailsCommitteeById(payload);
      actions.setDetailsCommittee(data);
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
    } finally {
      actions.setLoading(false);
    }
  }),
  addCommitteeData: thunk(async (actions, payload) => {
    actions.setError(null);
    actions.setSubmitting(true);

    try {
      const { data } = await addCommittee(payload);
      return data;
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
    } finally {
      actions.setSubmitting(false);
    }
  }),
  updateCommitteeData: thunk(async (actions, payload) => {
    actions.setError(null);
    actions.setSubmitting(true);

    try {
      const { data } = await updateCommitteeByPath(payload);
      return data;
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
    } finally {
      actions.setSubmitting(false);
    }
  }),
  deleteCommitteeData: thunk(async (actions, payload) => {
    actions.setSubmitting(true);

    try {
      await deleteCommittee(payload);
      actions.setDetailsCommittee(null);
      return true;
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
    } finally {
      actions.setSubmitting(false);
    }
  }),
};

export default committeeModel;
