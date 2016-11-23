'use strict';

import welcomeCtrl from './welcomeController';
//import headerComp from '../../shared/components/header';
import ROUTES_SCHEMA from '../../config/routes';

export default window.angular
	.module('productivityApp.welcome', [])
	.config(function($stateProvider) {
		$stateProvider.state({
			name: 'welcome',
			url: ROUTES_SCHEMA.welcome,
			views: {
				header: {
					template: '<header></header>'
				},
				content: {
					template: require('./welcome.html'),
					controller: 'welcomeCtrl as welcome'
				},
				footer: {
					template: '<footer></footer>'
				}
			}
		});
	})
	.controller('welcomeCtrl', ['$location', 'currentUser', welcomeCtrl])
	.name;
