'use strict';

import todoController from './todoController';
import ROUTES_SCHEMA from '../../config/routes';
import './todo.scss';

export default window.angular
	.module('productivityApp.todo', [])
	.config(function($stateProvider) {
		$stateProvider.state({
			name: 'todo',
			url: ROUTES_SCHEMA.list,
			views: {
				header: {
					template: '<header></header>'
				},
				content: {
					template: require('./todo.html'),
					controller: 'todoCtrl as todo'
				},
				footer: {
					template: '<footer></footer>'
				}
			}
		});
	})
	.controller('todoCtrl', ['currentUser', todoController])
	.name;