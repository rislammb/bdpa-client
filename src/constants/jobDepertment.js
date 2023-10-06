export const jobDepertmentOptions = [
  {
    id: '1',
    name: 'Directorate General of Family Planning',
    name_bn: 'পরিবার পরিকল্পনা অধিদপ্তর',
  },
  {
    id: '2',
    name: 'Directorate General of Health Services',
    name_bn: 'স্বাস্থ্য অধিদপ্তর',
  },

  { id: '3', name: 'Bangladesh Railway', name_bn: 'বাংলাদেশ রেলওয়ে', },
  {
    id: '4',
    name: 'Border Guard of Bangladesh',
    name_bn: 'বর্ডার গার্ড বাংলাদেশ',
  },
  { id: '5', name: 'Bangladesh Police', name_bn: 'বাংলাদেশ পুলিশ', },
  { id: '6', name: 'Bangladesh Bank', name_bn: 'বাংলাদেশ ব্যাংক', },
  { id: '17', name: 'Pharmacy/Medicine Store', name_bn: 'ফার্মেসী/ঔষধের দোকান', },
  { id: '18', name: 'Non-Governmental Organization', name_bn: 'বেসরকারী সংস্থা', },
];

export const jobDepertmentField = {
  type: 'select',
  options: [
    {
      id: '0',
      name: '--- Select ---',
      name_bn: '--- নির্বাচন ---',
    },
    ...jobDepertmentOptions,
  ],
  name: 'jobDepertment',
  label: 'Job Depertment',
  label_bn: 'চাকুরীর বিভাগ',
  value: '0',
};
