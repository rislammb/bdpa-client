export const jobDepertmentOptions = [
  {
    id: '1',
    name: 'Directorate General of Family Planning',
    bn_name: 'পরিবার পরিকল্পনা অধিদপ্তর',
  },
  {
    id: '2',
    name: 'Directorate General of Health Services',
    bn_name: 'স্বাস্থ্য অধিদপ্তর',
  },

  { id: '3', name: 'Bangladesh Railway', bn_name: 'বাংলাদেশ রেলওয়ে' },
  {
    id: '4',
    name: 'Border Guard of Bangladesh',
    bn_name: 'বর্ডার গার্ড বাংলাদেশ',
  },
  { id: '5', name: 'Bangladesh Police', bn_name: 'বাংলাদেশ পুলিশ' },
  { id: '6', name: 'Bangladesh Bank', bn_name: 'বাংলাদেশ ব্যাংক' },
  { id: '7', name: 'Retired', bn_name: 'অবসরপ্রাপ্ত' },
  { id: '8', name: 'University', bn_name: 'বিশ্ববিদ্যালয়' },
  { id: "9", name: "Department of Prison", bn_name: "কারা অধিদপ্তর" },
  {
    id: '17',
    name: 'Pharmacy/Medicine Store',
    bn_name: 'ফার্মেসী/ঔষধের দোকান',
  },
  {
    id: '18',
    name: 'Non-Governmental Organization',
    bn_name: 'বেসরকারী সংস্থা',
  },
];

export const jobDepertmentOptionsWithEmpty = [
  {
    id: '',
    name: '--- Select ---',
    bn_name: '--- নির্বাচন ---',
  },
  ...jobDepertmentOptions,
];

export const jobDepertmentField = {
  type: 'select',
  options: jobDepertmentOptionsWithEmpty,
  name: 'jobDepertment',
  label: 'Job Depertment',
  bn_label: 'চাকুরীর বিভাগ',
  value: '',
};
