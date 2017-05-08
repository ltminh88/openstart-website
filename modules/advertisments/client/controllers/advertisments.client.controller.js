(function () {
  'use strict';

  angular
    .module('advertisments')
    .controller('AdvertismentsController', AdvertismentsController);

  AdvertismentsController.$inject = ['$scope', 'advertismentResolve', 'Authentication'];

  function AdvertismentsController($scope, advertisment, Authentication) {
    var vm = this;

    vm.advertisment = advertisment;
    vm.authentication = Authentication;

  }
}());
