(function () {
  'use strict';

  angular
    .module('members.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.members', {
        abstract: true,
        url: '/members',
        template: '<ui-view/>'
      })
      .state('admin.members.list', {
        url: '',
        templateUrl: '/modules/members/client/views/admin/list-members.client.view.html',
        controller: 'MembersAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.members.create', {
        url: '/create',
        templateUrl: '/modules/members/client/views/admin/form-member.client.view.html',
        controller: 'MembersAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          memberResolve: newMember
        }
      })
      .state('admin.members.edit', {
        url: '/:memberId/edit',
        templateUrl: '/modules/members/client/views/admin/form-member.client.view.html',
        controller: 'MembersAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          memberResolve: getMember
        }
      });
  }

  getMember.$inject = ['$stateParams', 'MembersService'];

  function getMember($stateParams, MembersService) {
    return MembersService.get({
      memberId: $stateParams.memberId
    }).$promise;
  }

  newMember.$inject = ['MembersService'];

  function newMember(MembersService) {
    return new MembersService();
  }
}());
