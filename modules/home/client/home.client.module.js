(function(app) {
	'use strict';

	app.registerModule('home', ['core' , 'ngMaterial', 'articles', 'projects', 'articles.services', 'projects.services']);
	app.registerModule('home.routes', ['ui.router']);

}(ApplicationConfiguration));