import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

import configureAuthStore from "./store/auth";
import configureCommonStore from "./store/common";
import configureCategoryStore from "./store/category";
import configureItemStore from "./store/item";
import configureListStore from "./store/list";

configureAuthStore();
configureCommonStore();
configureCategoryStore();
configureItemStore();
configureListStore();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
