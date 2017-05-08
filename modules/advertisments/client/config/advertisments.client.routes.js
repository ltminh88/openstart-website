(function () {
  'use strict';

  angular
    .module('advertisments.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('advertisments', {
        abstract: true,
        url: '/advertisments',
        template: '<ui-view/>'
      })
      .state('advertisments.list', {
        url: '',
        templateUrl: '/modules/advertisments/client/views/list-advertisments.client.view.html',
        controller: 'AdvertismentsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Advertisments List'
        }
      })
      .state('advertisments.view', {
        url: '/:advertismentId',
        templateUrl: '/modules/advertisments/client/views/view-advertisment.client.view.html',
        controller: 'AdvertismentsController',
        controllerAs: 'vm',
        resolve: {
          advertismentResolve: getAdvertisment
        },
        data: {
          pageTitle: 'Advertisment {{ advertismentResolve.title }}'
        }
      });
  }

  getAdvertisment.$inject = ['$stateParams', 'AdvertismentsService'];

  function getAdvertisment($stateParams, AdvertismentsService) {
    return AdvertismentsService.get({
      advertismentId: $stateParams.advertismentId
    }).$promise;
  }
}());
