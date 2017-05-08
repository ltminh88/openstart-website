(function () {
  'use strict';

  angular
    .module('members.admin')
    .controller('MembersAdminListController', MembersAdminListController);

  MembersAdminListController.$inject = ['MembersService'];

  function MembersAdminListController(MembersService) {
    var vm = this;

    vm.members = MembersService.query();
  }
}());
