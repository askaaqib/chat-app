import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const app = document.getElementById('app');
const history = syncHistoryWithStore(browserHistory, store);

import HomePage from './home/components/home-page';
//components 
ReactDOM.render((
	<Provider store={ store }> 
	  <Router history={ history }>
	   	<Route path="/" component={ HomePage }/>	
	  </Router>
  </Provider> 
), app);

