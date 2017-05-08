(function () {
  'use strict';

  angular
    .module('advertisments.admin')
    .controller('AdvertismentsAdminListController', AdvertismentsAdminListController);

  AdvertismentsAdminListController.$inject = ['AdvertismentsService'];

  function AdvertismentsAdminListController(AdvertismentsService) {
    var vm = this;

    vm.advertisments = AdvertismentsService.query();
  }
}());
