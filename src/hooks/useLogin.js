import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react';

const initialState = { email: '', password: '' };

const useLogin = () => {
  const { user } = useStoreState((state) => state.auth);
  const { getAuthData } = useStoreActions((actions) => actions.auth);
  const [state, setState] = useState({ ...initialState });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getAuthData(state);
  };

  return {
    state,
    user,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
