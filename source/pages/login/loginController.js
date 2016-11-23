import ROUTES_SCHEMA from '../../config/routes';

export default function($resource, $location) {
	this.submit = function(e) {
		e.preventDefault();
		let result = {};
		const inputs = e.target.elements;
		for (let i = 0; i < inputs.length; i++) {
			const input = inputs[i];

			if (!input.name) {
				continue;
			}

			result[input.name] = input.value;
		}
		$resource('/users').save(result, function () {
			$location.path(ROUTES_SCHEMA.welcome);
		}, function (response) {
			console.log('Error: ', response.data);
		});
	}
};