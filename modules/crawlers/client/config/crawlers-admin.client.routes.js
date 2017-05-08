(function () {
  'use strict';

  angular
    .module('crawlers.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.crawlers', {
        abstract: true,
        url: '/crawlers',
        template: '<ui-view/>'
      })
      .state('admin.crawlers.list', {
        url: '',
        templateUrl: '/modules/crawlers/client/views/admin/list-crawlers.client.view.html',
        controller: 'CrawlersAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.crawlers.create', {
        url: '/create',
        templateUrl: '/modules/crawlers/client/views/admin/form-crawler.client.view.html',
        controller: 'CrawlersAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          crawlerResolve: newCrawler
        }
      })
      .state('admin.crawlers.edit', {
        url: '/:crawlerId/edit',
        templateUrl: '/modules/crawlers/client/views/admin/form-crawler.client.view.html',
        controller: 'CrawlersAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          crawlerResolve: getCrawler
        }
      });
  }

  getCrawler.$inject = ['$stateParams', 'CrawlersService'];

  function getCrawler($stateParams, CrawlersService) {
    return CrawlersService.get({
      crawlerId: $stateParams.crawlerId
    }).$promise;
  }

  newCrawler.$inject = ['CrawlersService'];

  function newCrawler(CrawlersService) {
    return new CrawlersService();
  }
}());
