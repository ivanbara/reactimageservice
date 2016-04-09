import React from 'react';
import {Route, IndexRoute} from 'react-router';

import ReactApp from '../components/ReactApp';
import MainPage from '../components/MainPage';
import ImagePage from '../components/ImagePage';


module.exports = (
	<Route path='/' handler={MainPage}>
		<IndexRoute component={ReactApp}/>
		<Route path='images' component={ImagePage}/>
	</Route>
);

