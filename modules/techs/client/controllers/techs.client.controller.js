(function () {
  'use strict';

  angular
    .module('techs')
    .controller('TechsController', TechsController);

  TechsController.$inject = ['$scope', 'techResolve', 'Authentication'];

  function TechsController($scope, tech, Authentication) {
    var vm = this;

    vm.tech = tech;
    vm.authentication = Authentication;

  }
}());
