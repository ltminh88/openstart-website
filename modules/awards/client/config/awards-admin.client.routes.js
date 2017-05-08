(function () {
  'use strict';

  angular
    .module('awards.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.awards', {
        abstract: true,
        url: '/awards',
        template: '<ui-view/>'
      })
      .state('admin.awards.list', {
        url: '',
        templateUrl: '/modules/awards/client/views/admin/list-awards.client.view.html',
        controller: 'AwardsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.awards.create', {
        url: '/create',
        templateUrl: '/modules/awards/client/views/admin/form-award.client.view.html',
        controller: 'AwardsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          awardResolve: newAward
        }
      })
      .state('admin.awards.edit', {
        url: '/:awardId/edit',
        templateUrl: '/modules/awards/client/views/admin/form-award.client.view.html',
        controller: 'AwardsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          awardResolve: getAward
        }
      });
  }

  getAward.$inject = ['$stateParams', 'AwardsService'];

  function getAward($stateParams, AwardsService) {
    return AwardsService.get({
      awardId: $stateParams.awardId
    }).$promise;
  }

  newAward.$inject = ['AwardsService'];

  function newAward(AwardsService) {
    return new AwardsService();
  }
}());
