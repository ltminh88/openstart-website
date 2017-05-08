(function(app) {
	'use strict';

	app.registerModule('core', ['ngStorage']);
	app.registerModule('core.routes', ['ui.router']);

}(ApplicationConfiguration));