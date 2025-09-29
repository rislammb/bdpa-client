export const genderOptions = [
  { id: "1", name: "Male", bn_name: "পুরুষ" },
  { id: "2", name: "Female", bn_name: "মহিলা" },
];

export const genderOptionsWithEmpty = [
  { id: "", name: "--- Select ---", bn_name: "--- নির্বাচন ---" },
  ...genderOptions,
];

export const genderField = {
  type: "select",
  name: "gender",
  label: "Gender",
  bn_label: "লিঙ্গ",
  options: [
    { id: "", name: "--- Select ---", bn_name: "--- নির্বাচন ---" },
    ...genderOptions,
  ],
  value: "",
};
