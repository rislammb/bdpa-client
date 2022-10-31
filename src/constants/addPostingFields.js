import { divisions } from './divisions';

export const addPostingFields = {
  postingDivision: {
    type: 'select',
    options: [{ id: '0', name: '--- Select ---' }, ...divisions],
    name: 'postingDivision',
    label: 'Posting Division',
    value: '0',
  },
  postingDistrict: {
    type: 'select',
    options: [{ id: '0', name: '--- Select ---' }],
    name: 'postingDistrict',
    label: 'Posting District',
    value: '0',
  },
  postingUpazila: {
    type: 'select',
    options: [{ id: '0', name: '--- Select ---' }],
    name: 'postingUpazila',
    label: 'Posting Upazila',
    value: '0',
  },
  postingPlace: {
    type: 'text',
    name: 'postingPlace',
    label: 'Posting Place',
    placeholder: 'Auchpara Health and Family Welfare Center',
    value: '',
  },
};
