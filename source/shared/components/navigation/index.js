'use strict';

import navController from './navigationController';
import './navigation.scss';

export default {
	name: 'navigation',
	template: require('./navigation.html'),
	controller: navController,
	controllerAs: 'navigation'
};