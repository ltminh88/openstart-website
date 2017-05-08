(function () {
  'use strict';

  angular
    .module('categorys.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.categorys', {
        abstract: true,
        url: '/categorys',
        template: '<ui-view/>'
      })
      .state('admin.categorys.list', {
        url: '',
        templateUrl: '/modules/category/client/views/admin/list-categorys.client.view.html',
        controller: 'CategoryAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.categorys.create', {
        url: '/create',
        templateUrl: '/modules/category/client/views/admin/form-category.client.view.html',
        controller: 'CategoryAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          gameCatResolve: newCategory
        }
      })
      .state('admin.category.edit', {
        url: '/:categoryId/edit',
        templateUrl: '/modules/category/client/views/admin/form-category.client.view.html',
        controller: 'CategoryAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          gameCatResolve: getCategory
        }
      });
  }
  getCategory.$inject = ['$stateParams', 'CategorysService'];

  function getCategory($stateParams, CategorysService) {
    return CategorysService.get({
      gameId: $stateParams.gameId
    }).$promise;
  }


  newCategory.$inject = ['CategorysService'];
  function newCategory(CategorysService) {
    return new CategorysService();
  }



}());
