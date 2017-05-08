(function () {
  'use strict';

  angular
    .module('techs.admin')
    .controller('TechsAdminListController', TechsAdminListController);

  TechsAdminListController.$inject = ['TechsService'];

  function TechsAdminListController(TechsService) {
    var vm = this;

    vm.techs = TechsService.query();
  }
}());
