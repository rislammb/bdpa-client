import { objDeepClone } from './utilities';

export const changeHandlerForCommitteeInfo = (committeeInfo, e, name) => {
  const clonedState = objDeepClone(committeeInfo);

  if (name === 'workHasStarted' || name === 'willExpire') {
    clonedState[name].value = e;
  } else if (e.target.name === 'indexNumber') {
    clonedState[e.target.name].value = e.target.value.replace(/[^0-9]/g, '');
  } else {
    clonedState[e.target.name].value = e.target.value;
  }

  return clonedState;
};
