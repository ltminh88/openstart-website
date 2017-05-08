(function () {
  'use strict';

  angular
    .module('techs.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.techs', {
        abstract: true,
        url: '/techs',
        template: '<ui-view/>'
      })
      .state('admin.techs.list', {
        url: '',
        templateUrl: '/modules/techs/client/views/admin/list-techs.client.view.html',
        controller: 'TechsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.techs.create', {
        url: '/create',
        templateUrl: '/modules/techs/client/views/admin/form-tech.client.view.html',
        controller: 'TechsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          techResolve: newTech
        }
      })
      .state('admin.techs.edit', {
        url: '/:techId/edit',
        templateUrl: '/modules/techs/client/views/admin/form-tech.client.view.html',
        controller: 'TechsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          techResolve: getTech
        }
      });
  }

  getTech.$inject = ['$stateParams', 'TechsService'];

  function getTech($stateParams, TechsService) {
    return TechsService.get({
      techId: $stateParams.techId
    }).$promise;
  }

  newTech.$inject = ['TechsService'];

  function newTech(TechsService) {
    return new TechsService();
  }
}());
