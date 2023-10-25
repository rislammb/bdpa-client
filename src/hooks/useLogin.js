import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';

const initialState = { email: '', password: '' };

const useLogin = () => {
  const {
    ui: { language },
    auth: { submitting, error },
  } = useStoreState((state) => state);
  const { setError, getLoginData } = useStoreActions((actions) => actions.auth);
  const [state, setState] = useState({ ...initialState });

  const isBn = language === 'BN' ? true : false;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getLoginData(state);
  };

  useEffect(() => {
    setError(null);
  }, []);

  return {
    isBn,
    state,
    error,
    handleChange,
    submitting,
    handleSubmit,
  };
};

export default useLogin;
