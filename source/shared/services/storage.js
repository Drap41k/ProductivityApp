import todoList from '../../config/todo';

export default function() {
	const storage = window.localStorage;

	function setDefaultData() {
		storage.usersList = angular.toJson([{
			username: 'admin',
			password: 'admin',
			list: todoList
		}]);
	}

	return {
		set: function(key, value) {
			storage[key] = window.angular.toJson(value);
		},
		get: function(key) {
			return window.angular.fromJson(storage[key]);
		},
		save: function(key, newValue) {
			this.set(key, window.angular.extend(this.get(key) || {}, newValue));
		},
		clear: function() {
			storage.clear();
			this.setDefaultData();
		},
		setDefaultData: setDefaultData
	};
};