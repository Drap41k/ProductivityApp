'use strict';

export default function(storage) {
	let currentUser;

	function setUser(user) {
		currentUser = user;
		saveToStorage();
	}

	function getUser() {
		if (!currentUser) {
			currentUser = storage.get('currentUser');
		}
		return currentUser;
	}

	function saveToStorage() {
		storage.save('currentUser', currentUser);
	}

	return {
		setUser: setUser,
		getUser: getUser,
		saveParams: function(params) {
			window.angular.extend(currentUser, params);
			saveToStorage();
		},
		logout: function() {
			storage.clear();
			currentUser = null;
		}
	};
};