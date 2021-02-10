import React from 'react';
import store from './redux/redux-store';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import {Provider} from 'react-redux';
import MainApp from "./App";

ReactDOM.render(
  <MainApp/>,
  document.getElementById('root')
);
