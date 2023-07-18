import { divisions } from './divisions';

export const addPermanentFields = {
  permanentDivision: {
    type: 'select',
    options: [{ id: '0', name: '--- Select ---' }, ...divisions],
    name: 'permanentDivision',
    label: 'Permanent Division',
    value: '0',
  },
  permanentDistrict: {
    type: 'select',
    options: [{ id: '0', name: '--- Select ---' }],
    name: 'permanentDistrict',
    label: 'Permanent District',
    value: '0',
  },
  permanentUpazila: {
    type: 'select',
    options: [{ id: '0', name: '--- Select ---' }],
    name: 'permanentUpazila',
    label: 'Permanent Upazila',
    value: '0',
  },
  permanentPlace: {
    type: 'text',
    name: 'permanentPlace',
    label: 'Permanent Place',
    placeholder: 'Village: Shantipur, Post: Sundorpur-9364',
    value: '',
  },
};
