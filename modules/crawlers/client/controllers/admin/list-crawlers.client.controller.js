(function () {
  'use strict';

  angular
    .module('crawlers.admin')
    .controller('CrawlersAdminListController', CrawlersAdminListController);

  CrawlersAdminListController.$inject = ['CrawlersService'];

  function CrawlersAdminListController(CrawlersService) {
    var vm = this;

    vm.crawlers = CrawlersService.query();
  }
}());
