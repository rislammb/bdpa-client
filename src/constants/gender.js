export const genderOptions = [
  { id: '1', name: 'Male', bn_name: 'পুরুষ' },
  { id: '2', name: 'Female', bn_name: 'মহিলা' },
  { id: '3', name: 'Other', bn_name: 'অন্যান্য' },
];

export const genderField = {
  type: 'select',
  name: 'gender',
  label: 'Gender',
  bn_label: 'লিঙ্গ',
  options: [
    { id: '', name: '--- Select ---', bn_name: '--- নির্বাচন ---' },
    ...genderOptions,
  ],
  value: '',
};
