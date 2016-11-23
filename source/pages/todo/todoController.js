'use strict';

export default function(currentUser) {
	this.list = currentUser.getUser().list;
	this.saveState = function(){
		currentUser.saveParams({list: this.list})
	};

	this.addTask = function() {
		if (!this.newTask) {
			return;
		}
		this.list.push({title: this.newTask});
		delete this.newTask;
		this.saveState();
	}
};