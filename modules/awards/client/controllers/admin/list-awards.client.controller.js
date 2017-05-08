(function () {
  'use strict';

  angular
    .module('awards.admin')
    .controller('AwardsAdminListController', AwardsAdminListController);

  AwardsAdminListController.$inject = ['AwardsService'];

  function AwardsAdminListController(AwardsService) {
    var vm = this;

    vm.awards = AwardsService.query();
  }
}());
