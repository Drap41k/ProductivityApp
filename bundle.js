/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _routes = __webpack_require__(1);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.module('myApp', ['ngMockE2E', 'ngResource', 'ngRoute']).config(_routes2.default).run(function ($httpBackend, currentUser) {
		if (window.localStorage) {
			//	if (!window.localStorage.usersList) {
			window.localStorage.usersList = angular.toJson([{
				username: 'admin',
				password: 'admin',
				list: [{
					title: 'Поставить галочку',
					done: true
				}, {
					title: 'Motorola XOOM™ with Wi-Fi'
				}, {
					title: 'MOTOROLA XOOM™'
				}]
			}]);
		}
		//}

		// requests for templates
		$httpBackend.whenGET('components/login/login.html').passThrough();
		$httpBackend.whenGET('components/todo/todo.html').passThrough();

		// attempt to login user
		$httpBackend.whenPOST('/users').respond(function (method, url, data) {
			var userData = angular.fromJson(data);
			var registeredUsers = angular.fromJson(window.localStorage.usersList);
			var index = registeredUsers.length;
			var response = [401, 'No such user or invalid password'];

			while (index--) {
				if (registeredUsers[index].username === userData.username) {
					if (registeredUsers[index].password === userData.password) {
						currentUser.setUser(registeredUsers[index]);
						response = [200, registeredUsers[index], {}];
					}
					break;
				}
			}

			return response;
		});
	}).controller('formCtrl', ['$resource', '$location', 'currentUser', function ($resource, $location, currentUser) {
		this.submit = function (e) {
			e.preventDefault();
			var result = {};
			var inputs = e.target.elements;
			for (var i = 0; i < inputs.length; i++) {
				var input = inputs[i];

				if (!input.name) {
					continue;
				}

				result[input.name] = input.value;
			}
			$resource('/users').save(result, function () {
				$location.path('/list');
			}, function (response) {
				console.log('Error: ', response.data);
			});
		};
	}]).controller('listCtrl', ['currentUser', function (currentUser) {
		this.list = currentUser.getUser().list;
	}]).factory('currentUser', function () {
		function setUser(user) {
			window.localStorage.currentUser = angular.toJson(user);
		}

		function getUser() {
			return angular.fromJson(window.localStorage.currentUser || {});
		}

		return {
			setUser: setUser,
			getUser: getUser
		};
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'pages/login/authorize.html',
			controller: 'formCtrl as form'
		}).when('/list', {
			templateUrl: 'pages/list/list.html',
			controller: 'listCtrl as list'
		});
	};

/***/ }
/******/ ]);