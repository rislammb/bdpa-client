import { genderField } from './gender';
import { jobDepertmentField } from './jobDepertment';

export const addFormFields = {
  regNumber: {
    type: 'text',
    name: 'regNumber',
    label: 'Registration Number',
    placeholder: 'B-0123',
    value: 'B-',
  },
  name: {
    type: 'text',
    name: 'name',
    label: 'Pharmacist Name',
    placeholder: 'Abdullah',
    value: '',
  },
  bn_name: {
    type: 'text',
    name: 'bn_name',
    label: 'Name in Bengali',
    placeholder: 'আবদুল্লাহ',
    value: '',
  },
  email: {
    type: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'abdullah@email.com',
    value: '',
  },
  mobile: {
    type: 'text',
    name: 'mobile',
    label: 'Mobile Number',
    placeholder: '01712123456',
    value: '',
  },
  dateOfBirth: {
    type: 'date',
    name: 'dateOfBirth',
    label: 'Date of Birth',
    value: new Date(),
  },
  gender: { ...genderField },
  passingYear: {
    type: 'text',
    name: 'passingYear',
    label: 'Diploma Passing Year',
    placeholder: '2012',
    value: '',
  },
  dateOfJoin: {
    type: 'date',
    name: 'dateOfJoin',
    label: 'Date of Join',
    value: new Date(),
  },
  jobDepertment: { ...jobDepertmentField },
};
