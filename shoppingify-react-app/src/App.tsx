import React from 'react';

import './App.css';
import { constants } from './common/data';
import { Layout } from "./components/common/Layout/Layout";
import { useStore } from "./store/useStore";
import { actionTypes as authActionTypes } from "./store/auth";
import { AuthLayout } from './components/auth/AuthLayout/AuthLayout';
import authService from "./services/utils/AuthService";
import categoryApiClient from "./services/api-clients/CategoryApiClient";
import { Category, CategorySearchParam } from './models/category';
import { IApiResponse, IError } from './models/common';
import { actionTypes as categoryAT } from "./store/category";

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
  const email = localStorage.getItem(constants.currentUserEmailStorageKey);

  dispatch({
    type: authActionTypes.signinSuccess,
    payload: { idToken: token, localId: userId, email: email }
  });

  categoryApiClient.search(new CategorySearchParam({ createdById: userId }))
    .then((res: IApiResponse) => {
      const categories = Object.keys(res.data).map(k => Category.toModel({ ...res.data[k], id: k }));
      dispatch({ type: categoryAT.searchCategoriesSuccess, payload: categories });
    })
    .catch((err: IError) => {
      // TODO error modal
      console.log(err);
    });

  return null;
}

export default App;
