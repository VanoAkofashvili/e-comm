import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "antd/dist/antd.css"
import './index.css';

import {Provider} from "react-redux";
import store from "./redux/store"

const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootEl
);