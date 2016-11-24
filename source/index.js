'use strict';

import '../bower_components/angular';
import '../bower_components/angular-resource';
import '../bower_components/angular-ui-router/release/angular-ui-router';
import '../bower_components/angular-mocks';
import './general.scss';

import {config, run} from './config/config'

import loginPage from './pages/login';
import todoPage from './pages/todo';
import welcomePage from './pages/welcome';

import headerComponent from './shared/components/header';
import footerComponent from './shared/components/footer';
import navComponent from './shared/components/navigation';

import userService from './shared/services/user';
import storageService from './shared/services/storage';

angular.module('productivityApp', ['ngMockE2E', 'ngResource', 'ui.router', loginPage, welcomePage, todoPage])
	.config(config)
	.run(run)
	.component('header', headerComponent)
	.component('footer', footerComponent)
	.component('navigation', navComponent)

	.factory('currentUser', userService)
	.factory('storage', storageService);