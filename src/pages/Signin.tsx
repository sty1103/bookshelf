import React from 'react';
import SigninContainer from '../containers/SigninContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { Navigate } from 'react-router-dom';

export default function Signin() {
  const token = useSelector<RootState, string|null>((state) => state.auth.token);

  if ( token === null ) {
    return <SigninContainer />;
  } else {
    return <Navigate to="/" />;
  }
}