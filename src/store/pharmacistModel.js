import { action, computed, thunk } from 'easy-peasy';
import { getDetailsPharmacist, getPharmacists } from '../api/pharmacist';
import {
  INITIAL_DEPERTMENT_INFO,
  INITIAL_LOCATION_INFO,
} from '../constants/initialInputInfo';
import { getFilteredPharmacists } from '../helpers/pharmacist';

const pharmacistModel = {
  loading: false,
  list: [],
  locationInfo: { ...INITIAL_LOCATION_INFO },
  jobDepertmentInfo: { ...INITIAL_DEPERTMENT_INFO },
  searchTerm: '',
  details: null,
  setLoading: action((state) => {
    state.loading = true;
  }),
  setPharmacists: action((state, payload) => {
    state.list = payload;
    state.loading = false;
  }),
  getPharmacistsData: thunk(async ({ setLoading, setPharmacists }) => {
    setPharmacists([]);
    setLoading(true);
    const data = await getPharmacists();
    setPharmacists(data);
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
    state.loading = false;
  }),
  getDetailsPharmacistData: thunk(
    async ({ setLoading, setDetailsPharmacist }, payload) => {
      setDetailsPharmacist(null);
      setLoading(true);
      const data = await getDetailsPharmacist(payload);

      setDetailsPharmacist(data);
    }
  ),
};

export default pharmacistModel;
