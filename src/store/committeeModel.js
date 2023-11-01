import { action, computed, thunk } from 'easy-peasy';
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
  searchTerm: '',
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
    state.list = payload;
  }),
  getCommitteesData: thunk(async (actions) => {
    actions.setCommittees([]);
    actions.setError(null);
    actions.setLoading(true);

    try {
      const { data } = await getCommittees();
      actions.setCommittees(data);
      actions.setLoading(false);
    } catch (e) {
      actions.setError(e.response?.data);
      actions.setLoading(false);
    }
  }),
  setSearchTerm: action((state, payload) => {
    state.searchTerm = payload.toLowerCase();
  }),
  filteredList: computed((state) =>
    state.list.filter((item) =>
      item.committeeTitle.toLowerCase().includes(state.searchTerm)
    )
  ),
  setDetailsCommittee: action((state, payload) => {
    state.details = payload;
  }),
  getDetailsCommitteeData: thunk(async (actions, payload) => {
    // actions.setDetailsCommittee(null);
    actions.setLoading(true);
    // actions.setError(null);

    try {
      const { data } = await getDetailsCommittee(payload);

      actions.setDetailsCommittee(data);
      actions.setLoading(false);
    } catch (e) {
      actions.setError(e.response?.data);
      actions.setLoading(false);
    }
  }),
  getDetailsCommitteeDataById: thunk(async (actions, payload) => {
    // actions.setDetailsCommittee(null);
    actions.setLoading(true);
    // actions.setError(null);

    try {
      const { data } = await getDetailsCommitteeById(payload);

      actions.setDetailsCommittee(data);
      actions.setLoading(false);
    } catch (e) {
      actions.setError(e.response?.data);
      actions.setLoading(false);
    }
  }),
  addCommitteeData: thunk(async (actions, payload) => {
    actions.setError(null);
    actions.setSubmitting(true);

    try {
      const { data } = await addCommittee(payload);
      actions.setSubmitting(false);
      return data;
    } catch (e) {
      actions.setError(e.response?.data);
      actions.setSubmitting(false);
    }
  }),
  updateCommitteeData: thunk(async (actions, payload) => {
    actions.setError(null);
    actions.setSubmitting(true);

    try {
      const { data } = await updateCommitteeByPath(payload);
      actions.setSubmitting(false);
      return data;
    } catch (e) {
      actions.setError(e.response?.data);
      actions.setSubmitting(false);
    }
  }),
  deleteCommitteeData: thunk(async (actions, payload) => {
    actions.setSubmitting(true);

    try {
      await deleteCommittee(payload);
      actions.setDetailsCommittee(null);
      actions.setSubmitting(false);
      return true;
    } catch (e) {
      actions.setError(e.response?.data);
      actions.setSubmitting(false);
    }
  }),
};

export default committeeModel;
