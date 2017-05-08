(function () {
  'use strict';

  angular
    .module('crawlers')
    .controller('CrawlersController', CrawlersController);

  CrawlersController.$inject = ['$scope', 'crawlerResolve', 'Authentication'];

  function CrawlersController($scope, crawler, Authentication) {
    var vm = this;

    vm.crawler = crawler;
    vm.authentication = Authentication;

  }
}());
