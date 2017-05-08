(function () {
  'use strict';

  angular
    .module('advertisments')
    .controller('AdvertismentsListController', AdvertismentsListController);

  AdvertismentsListController.$inject = ['AdvertismentsService'];

  function AdvertismentsListController(AdvertismentsService) {
    var vm = this;

    vm.advertisments = AdvertismentsService.query();
  }
}());
