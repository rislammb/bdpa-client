import { useState } from 'react';
import { addPostingFields } from '../constants/addPostingFields';
import { districts } from '../constants/districts';
import { upazilas } from '../constants/upazilas';
import PostingGroup from './PostingGroup';

const postingFieldsFromPharmacist = (pharmacist) => {
  return {
    ...Object.keys({ ...addPostingFields }).reduce((acc, cur) => {
      acc[cur] = { ...addPostingFields[cur] };
      if (cur === 'postingDivision') {
        if (pharmacist[cur].id) {
          acc[cur].value = pharmacist[cur].id;
        }
      } else if (cur === 'postingDistrict') {
        if (pharmacist[cur].id) {
          acc[cur].options = [
            ...addPostingFields[cur].options,
            ...districts.filter(
              (district) =>
                district.division_id === pharmacist['postingDivision'].id
            ),
          ];
          acc[cur].value = pharmacist[cur].id;
        }
      } else if (cur === 'postingUpazila') {
        if (pharmacist[cur].id) {
          acc[cur].options = [
            ...addPostingFields[cur].options,
            ...upazilas.filter(
              (upazila) =>
                upazila.district_id === pharmacist['postingDistrict'].id
            ),
          ];
          acc[cur].value = pharmacist[cur].id;
        }
      } else {
        acc[cur].value = pharmacist[cur] || '';
      }
      return acc;
    }, {}),
  };
};

const DetailsTablePostingGroup = ({ pharmacist }) => {
  const [postingFields, setPostingFields] = useState(
    postingFieldsFromPharmacist(pharmacist)
  );
  const postingFieldsArray = Object.keys(postingFields).reduce((acc, cur) => {
    acc.push(postingFields[cur]);
    return acc;
  }, []);

  const handlePostingChange = (e) => {
    if (e.target.name === 'postingDivision') {
      setPostingFields((prevState) => ({
        ...prevState,
        [e.target.name]: {
          ...prevState[e.target.name],
          value: e.target.value,
        },
        postingDistrict: {
          ...prevState['postingDistrict'],
          options: [
            ...addPostingFields['postingDistrict'].options,
            ...districts.filter(
              (district) => district.division_id === e.target.value
            ),
          ],
          value: '0',
        },
        postingUpazila: {
          ...prevState['postingUpazila'],
          options: [...addPostingFields['postingUpazila'].options],
          value: '0',
        },
      }));
    } else if (e.target.name === 'postingDistrict') {
      setPostingFields((prevState) => ({
        ...prevState,
        [e.target.name]: {
          ...prevState[e.target.name],
          value: e.target.value,
        },
        postingUpazila: {
          ...prevState['postingUpazila'],
          options: [
            ...addPostingFields['postingUpazila'].options,
            ...upazilas.filter(
              (upazila) => upazila.district_id === e.target.value
            ),
          ],
          value: '0',
        },
      }));
    } else {
      setPostingFields((prevState) => ({
        ...prevState,
        [e.target.name]: {
          ...prevState[e.target.name],
          value: e.target.value,
        },
      }));
    }
  };

  return (
    <PostingGroup
      postingInfo={postingFieldsArray}
      onChange={handlePostingChange}
      error={{}}
    />
  );
};

export default DetailsTablePostingGroup;
