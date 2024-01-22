import { action, thunk } from 'easy-peasy';
import {
  addPharmacist,
  deletePharmacist,
  getDetailsPharmacist,
  getPharmacists,
  updatePharmacist,
} from '../api/pharmacist';

const pharmacistModel = {
  loading: false,
  submitting: false,
  error: null,
  list: [],
  pharmacistsCount: 0,
  totalPharmacistsCount: 0,
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
  setPharmacists: action((state, payload) => {
    state.list = payload.pharmacists;
    state.pharmacistsCount = payload.pharmacistsCount;
    state.totalPharmacistsCount = payload.totalPharmacistsCount;
  }),
  getPharmacistsData: thunk(async (actions, payload) => {
    actions.setLoading(true);

    try {
      const { data } = await getPharmacists(payload);
      actions.setPharmacists(data);
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
    } finally {
      actions.setLoading(false);
    }
  }),
  setDetailsPharmacist: action((state, payload) => {
    state.details = payload;
  }),
  getDetailsPharmacistData: thunk(async (actions, payload) => {
    actions.setLoading(true);
    actions.setDetailsPharmacist(null);
    actions.setError(null);

    try {
      const { data } = await getDetailsPharmacist(payload);
      actions.setDetailsPharmacist(data);
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
    } finally {
      actions.setLoading(false);
    }
  }),
  addPharmacistData: thunk(async (actions, payload) => {
    actions.setError(null);
    actions.setSubmitting(true);

    try {
      const { data } = await addPharmacist(payload);
      return data;
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
    } finally {
      actions.setSubmitting(false);
    }
  }),
  updatePharmacistData: thunk(async (actions, payload) => {
    actions.setError(null);
    actions.setSubmitting(true);

    try {
      const { data } = await updatePharmacist(payload);
      actions.setDetailsPharmacist(data);
      return data;
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
    } finally {
      actions.setSubmitting(false);
    }
  }),
  deletePharmacistData: thunk(async (actions, payload) => {
    actions.setSubmitting(true);
    actions.setError(null);

    try {
      await deletePharmacist(payload);
      actions.setDetailsPharmacist(null);
      return true;
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
    } finally {
      actions.setSubmitting(false);
    }
  }),
};

export default pharmacistModel;
