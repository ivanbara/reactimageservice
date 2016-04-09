// "fetch" global
require('whatwg-fetch')

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import mainrouter from './routes/mainrouter';

const app = document.getElementById('app');

render(<Router routes={mainrouter} history={browserHistory}/>, app);

