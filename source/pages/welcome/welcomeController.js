'use strict';

import ROUTES_SCHEMA from '../../config/routes';

export default function($location, currentUser) {
	const user = currentUser.getUser();
	this.name = user.username;
	this.counter = user.list.filter(item => !item.done).length;

	this.next = function() {
		$location.path(ROUTES_SCHEMA.list);
	}
};