export function config($stateProvider) {
	$stateProvider.state('logout', {
		url: '/logout'
	});
}

export function run($httpBackend, currentUser, $rootScope, $location, $state, storage) {
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
}