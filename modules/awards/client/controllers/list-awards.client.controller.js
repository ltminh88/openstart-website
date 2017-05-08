(function () {
  'use strict';

  angular
    .module('awards')
    .controller('AwardsListController', AwardsListController);

  AwardsListController.$inject = ['AwardsService'];

  function AwardsListController(AwardsService) {
    var vm = this;

    vm.awards = AwardsService.query();
  }
}());
