import { action, thunk } from 'easy-peasy';
import { addMember, deleteMemberById, updateMemberById } from '../api/member';

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
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
      actions.setSubmitting(false);
    }
  }),
  updateMemberData: thunk(async (actions, payload) => {
    actions.setError(null);
    actions.setSubmitting(true);
    try {
      const { data } = await updateMemberById(payload);
      actions.setSubmitting(false);
      return data;
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
      actions.setSubmitting(false);
    }
  }),
  deleteCommitteeMember: thunk(async (actions, payload) => {
    actions.setError(null);
    actions.setSubmitting(true);
    try {
      await deleteMemberById(payload);
      actions.setSubmitting(false);
      return true;
    } catch (e) {
      if (e.response) actions.setError(e.response.data);
      else actions.setError(e.message);
      actions.setSubmitting(false);
    }
  }),
};

export default memberModel;
