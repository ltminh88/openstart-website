(function () {
  'use strict';

  angular
    .module('pages')
    .controller('PagesController', PagesController);

  PagesController.$inject = ['$scope', 'pageResolve', 'Authentication'];

  function PagesController($scope, page, Authentication) {
    var vm = this;

    vm.page = page;
    vm.authentication = Authentication;

  }
}());
