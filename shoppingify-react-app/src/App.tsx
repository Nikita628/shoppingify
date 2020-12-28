import React from 'react';

import './App.css';
import { constants } from './common/data';
import { Layout } from "./components/common/Layout/Layout";
import { useStore } from "./store/useStore";
import { actionTypes as authActionTypes } from "./store/auth";
import { AuthLayout } from './components/auth/AuthLayout/AuthLayout';
import authService from "./services/utils/AuthService";
import commonService from "./services/utils/CommonService";

function App() {
  const [appState, dispatch] = useStore("App", "auth");

  React.useEffect(() => {
    const loggedInFromStorage = authService.tryLoginFromLocalStorage();

    if (!loggedInFromStorage) {
      authService.clearAuthFromLocalStorage();
      dispatch({ type: authActionTypes.loginFromLocalStorageFailed });
    } else {
      const token = localStorage.getItem(constants.tokenStorageKey);
      const userId = localStorage.getItem(constants.currentUserIdStorageKey);
      const email = localStorage.getItem(constants.currentUserEmailStorageKey);
      commonService.loadInitialData(dispatch, userId);

      dispatch({
        type: authActionTypes.signinSuccess,
        payload: { idToken: token, localId: userId, email: email }
      });
    }
  }, [appState.auth.currentUserId, appState.auth.token]);

  if (appState.auth.currentUserId && appState.auth.token) {
    return (<Layout />);
  } else if (!appState.auth.currentUserId && !appState.auth.token && appState.auth.failedLoginFromLocalStorage) {
    return (<AuthLayout />);
  } else {
    return null;
  }
}

export default App;
