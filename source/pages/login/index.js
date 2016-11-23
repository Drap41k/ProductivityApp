'use strict';

import loginController from './loginController';
import ROUTES_SCHEMA from '../../config/routes';

export default window.angular
	.module('productivityApp.login', ['ngResource', 'ui.router'])
	.config(function($stateProvider) {
		$stateProvider.state({
			name: 'login',
			url: ROUTES_SCHEMA.login,
			views: {
				content: {
					template: require('./login.html'),
					controller: 'formCtrl as form'
				},
			}
		});
	})
	.controller('formCtrl', ['$resource', '$location', 'currentUser', loginController])
	.name;