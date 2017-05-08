(function () {
  'use strict';

  angular
    .module('categorys.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('categorys', {
        abstract: true,
        url: '/categorys',
        template: '<ui-view/>'
      })
      .state('categorys.list', {
        url: '',
        templateUrl: '/modules/category/client/views/list-categorys.client.view.html',
        controller: 'CategoryListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Category List'
        }
      })
      .state('category.view', {
        url: '/:gameId',
        templateUrl: '/modules/category/client/views/view-category.client.view.html',
        controller: 'CategoryController',
        controllerAs: 'vm',
        resolve: {
          gameCatResolve: getGameCat
        },
        data: {
          pageTitle: 'Game Category {{ gameCatResolve.title }}'
        }
      });
  }

  getGameCat.$inject = ['$stateParams', 'GameCatsService'];

  function getGameCat($stateParams, GameCatsService) {
    return GamesService.get({
      gameId: $stateParams.gameId
    }).$promise;
  }
}());
