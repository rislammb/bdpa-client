import dayjs from 'dayjs';
import { enToBnNumber } from './number';

const enToBnMonth = {
  Jan: 'জানুয়ারি',
  Feb: 'ফেব্রুয়ারি',
  Mar: 'মার্চ',
  Apr: 'এপ্রিল',
  May: 'মে',
  Jun: 'জুন',
  Jul: 'জুলাই',
  Aug: 'আগস্ট',
  Sep: 'সেপ্টেম্বর',
  Oct: 'অক্টোবর',
  Nov: 'নভেম্বর',
  Dec: 'ডিসেম্বর',
};

export const getBnDate = (date) => {
  const formatedDate = dayjs(date).format('DD MMM YYYY');

  const bn = formatedDate
    .split(' ')
    .map((item, index) => {
      if (index === 1) {
        return enToBnMonth[item];
      } else {
        return enToBnNumber(item);
      }
    })
    .join(' ');

  return bn;
};
