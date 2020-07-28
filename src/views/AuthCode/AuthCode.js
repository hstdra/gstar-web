import React, { useEffect } from 'react';
import { login } from 'redux/actions';
import { useDispatch } from 'react-redux';

const AuthCode = props => {
  const { history } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login()).then(() => {
      history.push('/');
    });

    return () => {};
    // eslint-disable-next-line
  }, []);

  return <div />;
};

export default AuthCode;
