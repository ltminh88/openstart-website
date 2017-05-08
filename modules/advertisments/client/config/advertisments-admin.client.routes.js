(function () {
  'use strict';

  angular
    .module('advertisments.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.advertisments', {
        abstract: true,
        url: '/advertisments',
        template: '<ui-view/>'
      })
      .state('admin.advertisments.list', {
        url: '',
        templateUrl: '/modules/advertisments/client/views/admin/list-advertisments.client.view.html',
        controller: 'AdvertismentsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.advertisments.create', {
        url: '/create',
        templateUrl: '/modules/advertisments/client/views/admin/form-advertisment.client.view.html',
        controller: 'AdvertismentsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          advertismentResolve: newAdvertisment
        }
      })
      .state('admin.advertisments.edit', {
        url: '/:advertismentId/edit',
        templateUrl: '/modules/advertisments/client/views/admin/form-advertisment.client.view.html',
        controller: 'AdvertismentsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          advertismentResolve: getAdvertisment
        }
      });
  }

  getAdvertisment.$inject = ['$stateParams', 'AdvertismentsService'];

  function getAdvertisment($stateParams, AdvertismentsService) {
    return AdvertismentsService.get({
      advertismentId: $stateParams.advertismentId
    }).$promise;
  }

  newAdvertisment.$inject = ['AdvertismentsService'];

  function newAdvertisment(AdvertismentsService) {
    return new AdvertismentsService();
  }
}());
