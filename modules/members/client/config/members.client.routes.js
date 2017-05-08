(function () {
  'use strict';

  angular
    .module('members.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('members', {
        abstract: true,
        url: '/members',
        template: '<ui-view/>'
      })
      .state('members.list', {
        url: '',
        templateUrl: '/modules/members/client/views/list-members.client.view.html',
        controller: 'MembersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Members List'
        }
      })
      .state('members.view', {
        url: '/:memberId',
        templateUrl: '/modules/members/client/views/view-member.client.view.html',
        controller: 'MembersController',
        controllerAs: 'vm',
        resolve: {
          memberResolve: getMember
        },
        data: {
          pageTitle: 'Member {{ memberResolve.title }}'
        }
      });
  }

  getMember.$inject = ['$stateParams', 'MembersService'];

  function getMember($stateParams, MembersService) {
    return MembersService.get({
      memberId: $stateParams.memberId
    }).$promise;
  }
}());
