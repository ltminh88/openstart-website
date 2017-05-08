(function () {
  'use strict';

  angular
    .module('techs.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('techs', {
        abstract: true,
        url: '/techs',
        template: '<ui-view/>'
      })
      .state('techs.list', {
        url: '',
        templateUrl: '/modules/techs/client/views/list-techs.client.view.html',
        controller: 'TechsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Techs List'
        }
      })
      .state('techs.view', {
        url: '/:techId',
        templateUrl: '/modules/techs/client/views/view-tech.client.view.html',
        controller: 'TechsController',
        controllerAs: 'vm',
        resolve: {
          techResolve: getTech
        },
        data: {
          pageTitle: 'Tech {{ techResolve.title }}'
        }
      });
  }

  getTech.$inject = ['$stateParams', 'TechsService'];

  function getTech($stateParams, TechsService) {
    return TechsService.get({
      techId: $stateParams.techId
    }).$promise;
  }
}());
