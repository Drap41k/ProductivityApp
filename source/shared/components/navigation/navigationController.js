'use strict';

import menuList from '../../../config/menu';

export default function(storage, $state) {
	this.opened = false;
	this.state = $state.current.name;
	this.menu = menuList;
	this.logout = function() {
		storage.clear();
		$state.go('login');
	}
};