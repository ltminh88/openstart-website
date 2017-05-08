(function () {
  'use strict';

  angular
    .module('awards')
    .controller('AwardsController', AwardsController);

  AwardsController.$inject = ['$scope', 'awardResolve', 'Authentication'];

  function AwardsController($scope, award, Authentication) {
    var vm = this;

    vm.award = award;
    vm.authentication = Authentication;

  }
}());
