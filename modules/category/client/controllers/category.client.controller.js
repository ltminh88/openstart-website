(function () {
	'use strict';

	angular
	.module('categorys')
	.controller('CategorysController', CategorysController);

	CategorysController.$inject = ['$scope', 'categoryResolve', 'Authentication'];

	function CategorysController($scope, category, Authentication) {
		var vm = this;

		vm.category = category;
		vm.authentication = Authentication;
	}

}());

