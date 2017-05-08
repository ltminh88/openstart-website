(function () {
  'use strict';

  angular
    .module('members')
    .controller('MembersController', MembersController);

  MembersController.$inject = ['$scope', 'memberResolve', 'Authentication'];

  function MembersController($scope, member, Authentication) {
    var vm = this;

    vm.member = member;
    vm.authentication = Authentication;

  }
}());
