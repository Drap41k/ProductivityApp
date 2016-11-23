'use strict';

import '../bower_components/angular';
import '../bower_components/angular-resource';
//import '../bower_components/angular-route';
import '../bower_components/angular-ui-router/release/angular-ui-router';
import '../bower_components/angular-mocks';
import './general.scss';

import login from './pages/login';
import todo from './pages/todo';
import welcome from './pages/welcome';

import headerComponent from './shared/components/header';
import footerComponent from './shared/components/footer';
import navComponent from './shared/components/navigation';

import userService from './shared/services/user';
import storageService from './shared/services/storage';

angular.module('productivityApp', ['ngMockE2E', 'ngResource', 'ui.router', login, welcome, todo])
	.config(function($stateProvider) {
		$stateProvider.state('logout', {
			url: '/logout'
		});
	})
	.run(function($httpBackend, currentUser, $rootScope, $location, $state, storage) {
		// todo: move out run block to another file
		storage.setDefaultData();

		$rootScope.$on('$stateChangeStart', function(event, next) {
			const userRegistered = !!currentUser.getUser();

			switch (next.name) {
				case 'login':
					if (userRegistered) {
						changeState(event, 'welcome');
					}
					break;
				case 'logout':
					currentUser.logout();
					changeState(event, 'login');
					break;
				default:
					if (!userRegistered) {
						changeState(event, 'login');
					}
					break;
			}

		});

		function changeState(event, nextName) {
			event.preventDefault();
			$state.go(nextName);
		}

		// attempt to login user
		$httpBackend.whenPOST('/users').respond(function(method, url, data) {
			const userData = window.angular.fromJson(data);
			const registeredUsers = window.angular.fromJson(window.localStorage.usersList);
			let index = registeredUsers.length;
			let response = [401, 'No such user or invalid password'];

			while (index--) {
				if (registeredUsers[index].username === userData.username) {
					if (registeredUsers[index].password === userData.password) {
						currentUser.setUser(registeredUsers[index]);
						response = [200, registeredUsers[index]];
					}
					break;
				}
			}

			return response;
		});
	})
	.component('header', headerComponent)
	.component('footer', footerComponent)
	.component('navigation', navComponent)

	.factory('currentUser', userService)
	.factory('storage', storageService);