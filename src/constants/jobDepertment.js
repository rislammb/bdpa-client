export const jobDepertmentOptions = [
  {
    id: '1',
    name: 'Directorate General of Family Planning',
  },
  {
    id: '2',
    name: 'Directorate General of Health Services',
  },

  { id: '3', name: 'Bangladesh Railway' },
  {
    id: '4',
    name: 'Border Guard of Bangladesh',
  },
  { id: '5', name: 'Bangladesh Police' },
];

export const jobDepertmentField = {
  type: 'select',
  options: [
    {
      id: '0',
      name: '--- Select ---',
    },
    ...jobDepertmentOptions,
  ],
  name: 'jobDepertment',
  label: 'Job Depertment',
  value: '0',
};
