(function () {
  'use strict';

  angular
    .module('techs')
    .controller('TechsListController', TechsListController);

  TechsListController.$inject = ['TechsService'];

  function TechsListController(TechsService) {
    var vm = this;

    vm.techs = TechsService.query();
  }
}());
