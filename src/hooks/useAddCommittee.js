import { useState } from 'react';

const objDeepClone = (obj) => JSON.parse(JSON.stringify(obj));

const useAddCommittee = (initial, validate) => {
  const [state, setState] = useState(mapInitialToState(initial));

  const onFocus = (e) => {
    const clonedState = objDeepClone(state);
    clonedState[e.target.name].touched = true;

    setState(clonedState);
  };

  const onChange = (e, name) => {
    const clonedState = objDeepClone(state);

    if (name === 'workHasStarted' || name === 'willExpire') {
      clonedState[name].value = e;
    } else if (e.target.name === 'indexNumber') {
      clonedState[e.target.name].value = e.target.value.replace(/[^0-9]/g, '');
    } else {
      clonedState[e.target.name].value = e.target.value;
    }

    setState(clonedState);
  };

  const onBlur = () => {
    const { valid, data } = validate(mapStateToValue(state));

    if (!valid) {
      const clonedState = objDeepClone(state);

      Object.keys.forEach((key) => {
        clonedState[key].error = data[key];
      });

      setState(clonedState);
    }
  };

  const onSubmit = (e, cb) => {
    e.preventDefault();

    cb(mapStateToValue(state));
  };

  return {
    state,
    onFocus,
    onChange,
    onBlur,
    onSubmit,
  };
};

const mapInitialToState = (initial) =>
  Object.keys(initial).reduce((acc, cur) => {
    acc[cur] = {
      name: cur,
      label: initial[cur].label ?? '',
      value: initial[cur].value,
      placeholder: initial[cur].placeholder,
      type: initial[cur].type ?? 'text',
      touched: false,
      error: '',
    };

    return acc;
  }, {});

const mapStateToValue = (state) =>
  Object.keys(state).reduce((acc, cur) => {
    acc[cur] = state[cur].value;

    return acc;
  }, {});

export default useAddCommittee;
