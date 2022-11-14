export const genderOptions = [
  { id: '1', name: 'Male' },
  { id: '2', name: 'Female' },
  { id: '3', name: 'Other' },
];

export const genderField = {
  type: 'select',
  options: [{ id: '0', name: '--- Select ---' }, ...genderOptions],
  name: 'gender',
  label: 'Gender',
  placeholder: 'Male',
  value: '0',
};
