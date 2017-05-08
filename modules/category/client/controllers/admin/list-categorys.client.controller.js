(function () {
  'use strict';

  angular
    .module('categorys.admin')
    .controller('CategorysAdminListController', CategorysAdminListController);

  CategorysAdminListController.$inject = ['CategorysService'];

  function CategorysAdminListController(CategorysService) {
    var vm = this;

    vm.category = CategorysService.query();
  }
}());
