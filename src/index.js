/*!

=========================================================
* Material Stocks React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
// core components
import Admin from "layouts/Admin.js";
import reducers from "store/reducers";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import Address from "./views/Address/Address";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const hist = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <Router history={hist}>
            <Switch>
              <Route path="/app/:useraddress?" component={Admin} />
              <Redirect from="/" to="/app/dashboard" />
            </Switch>
        </Router>
    </Provider>,
  document.getElementById("root")
);
