(function () {
  'use strict';

  angular
    .module('awards.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('awards', {
        abstract: true,
        url: '/awards',
        template: '<ui-view/>'
      })
      .state('awards.list', {
        url: '',
        templateUrl: '/modules/awards/client/views/list-awards.client.view.html',
        controller: 'AwardsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Awards List'
        }
      })
      .state('awards.view', {
        url: '/:awardId',
        templateUrl: '/modules/awards/client/views/view-award.client.view.html',
        controller: 'AwardsController',
        controllerAs: 'vm',
        resolve: {
          awardResolve: getAward
        },
        data: {
          pageTitle: 'Award {{ awardResolve.title }}'
        }
      });
  }

  getAward.$inject = ['$stateParams', 'AwardsService'];

  function getAward($stateParams, AwardsService) {
    return AwardsService.get({
      awardId: $stateParams.awardId
    }).$promise;
  }
}());
