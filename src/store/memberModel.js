import { action, thunk } from 'easy-peasy';
import { addMember } from '../api/member';

const memberModel = {
  submitting: false,
  error: null,
  setSubmitting: action((state, payload) => {
    state.submitting = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  addMemberData: thunk(async (actions, payload) => {
    actions.setError(null);
    actions.setSubmitting(true);

    try {
      const { data } = await addMember(payload);

      actions.setSubmitting(false);
      return data;
    } catch (e) {
      actions.setError(e.response?.data);
      actions.setSubmitting(false);
    }
  }),
  deleteMemberData: thunk(async (actions, payload) => {
    actions.setSubmitting(true);

    try {
      // await deleteCommittee(payload);
      // actions.setDetailsCommittee(null);
      actions.setSubmitting(false);
    } catch (e) {
      // actions.setError(e.response?.data);
      actions.setSubmitting(false);
    }
  }),
};

export default memberModel;
