import { action, computed, thunk } from 'easy-peasy';
import { getCommittees, getDetailsCommittee } from '../api/committee';

const committeeModel = {
  loading: false,
  list: [],
  searchTerm: '',
  details: null,
  setLoading: action((state) => {
    state.loading = true;
  }),
  setCommittees: action((state, payload) => {
    state.list = payload;
    state.loading = false;
  }),
  getCommitteesData: thunk(async ({ setLoading, setCommittees }) => {
    setCommittees([]);
    setLoading(true);
    const data = await getCommittees();
    setCommittees(data);
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
    state.loading = false;
  }),
  getDetailsCommitteeData: thunk(
    async ({ setLoading, setDetailsCommittee }, payload) => {
      setDetailsCommittee(null);
      setLoading(true);
      const data = await getDetailsCommittee(payload);

      setDetailsCommittee(data);
    }
  ),
};

export default committeeModel;
