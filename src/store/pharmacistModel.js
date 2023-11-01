import { action, computed, thunk } from 'easy-peasy';
import {
  addPharmacist,
  deletePharmacist,
  getDetailsPharmacist,
  getPharmacists,
  updatePharmacist,
} from '../api/pharmacist';
import {
  INITIAL_DEPERTMENT_INFO,
  INITIAL_LOCATION_INFO,
} from '../constants/initialInputInfo';
import { getFilteredPharmacists } from '../helpers/pharmacist';

const pharmacistModel = {
  loading: false,
  submitting: false,
  error: null,
  list: [],
  locationInfo: { ...INITIAL_LOCATION_INFO },
  jobDepertmentInfo: { ...INITIAL_DEPERTMENT_INFO },
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
  setPharmacists: action((state, payload) => {
    state.list = payload;
  }),
  getPharmacistsData: thunk(async (actions) => {
    actions.setLoading(true);
    actions.setError(null);
    actions.setPharmacists([]);

    try {
      const { data } = await getPharmacists();
      actions.setPharmacists(data);
      actions.setLoading(false);
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
      actions.setLoading(false);
    }
  }),
  setLocationInfo: action((state, payload) => {
    state.searchTerm = '';
    state.jobDepertmentInfo = { ...INITIAL_DEPERTMENT_INFO };
    state.locationInfo = { ...payload };
  }),
  setJobDepertmentInfo: action((state, payload) => {
    state.searchTerm = '';
    state.jobDepertmentInfo = { ...payload };
  }),
  setSearchTerm: action((state, payload) => {
    state.searchTerm = payload.toLowerCase();
  }),
  filteredList: computed((state) => {
    const { list, locationInfo, jobDepertmentInfo, searchTerm } = state;
    return getFilteredPharmacists(
      list,
      locationInfo,
      jobDepertmentInfo,
      searchTerm
    );
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
      actions.setLoading(false);
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
      actions.setLoading(false);
    }
  }),
  addPharmacistData: thunk(async (actions, payload) => {
    actions.setError(null);
    actions.setSubmitting(true);

    try {
      const { data } = await addPharmacist(payload);
      actions.setSubmitting(false);

      return data;
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
      actions.setSubmitting(false);
    }
  }),
  updatePharmacistData: thunk(async (actions, payload) => {
    actions.setError(null);
    actions.setSubmitting(true);

    try {
      const { data } = await updatePharmacist(payload);
      actions.setDetailsPharmacist(data);
      actions.setSubmitting(false);
      return data;
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
      actions.setSubmitting(false);
    }
  }),
  deletePharmacistData: thunk(async (actions, payload) => {
    actions.setSubmitting(true);
    actions.setError(null);

    try {
      await deletePharmacist(payload);
      actions.setDetailsPharmacist(null);
      actions.setSubmitting(false);
      return true;
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
      actions.setSubmitting(false);
    }
  }),
};

export default pharmacistModel;
