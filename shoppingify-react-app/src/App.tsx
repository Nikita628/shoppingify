import React from 'react';

import './App.css';
import { constants } from './common/data';
import { Layout } from "./components/common/Layout/Layout";
import { useStore } from "./store/useStore";
import { actionTypes as authActionTypes } from "./store/auth";
import { AuthLayout } from './components/auth/AuthLayout/AuthLayout';
import authService from "./services/utils/AuthService";

function App() {
  const [appState, dispatch] = useStore();

  if (appState.auth.currentUserId && appState.auth.token) {
    return (<Layout />);
  }

  const loggedInFromStorage = authService.tryLoginFromLocalStorage();

  if (!loggedInFromStorage) {
    authService.clearAuthFromLocalStorage();
    return (<AuthLayout />);
  }

  const token = localStorage.getItem(constants.tokenStorageKey);
  const userId = localStorage.getItem(constants.currentUserIdStorageKey);

  dispatch({
    type: authActionTypes.signinSuccess,
    payload: { idToken: token, localId: userId }
  });

  return null;
}

export default App;
