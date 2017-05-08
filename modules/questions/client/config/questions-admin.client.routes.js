(function () {
  'use strict';

  angular
    .module('questions.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.questions', {
        abstract: true,
        url: '/questions',
        template: '<ui-view/>'
      })
      .state('admin.questions.list', {
        url: '',
        templateUrl: '/modules/questions/client/views/admin/list-questions.client.view.html',
        controller: 'QuestionsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.questions.create', {
        url: '/create',
        templateUrl: '/modules/questions/client/views/admin/form-question.client.view.html',
        controller: 'QuestionsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          questionResolve: newQuestion
        }
      })
      .state('admin.questions.edit', {
        url: '/:questionId/edit',
        templateUrl: '/modules/questions/client/views/admin/form-question.client.view.html',
        controller: 'QuestionsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          questionResolve: getQuestion
        }
      });
  }

  getQuestion.$inject = ['$stateParams', 'QuestionsService'];

  function getQuestion($stateParams, QuestionsService) {
    return QuestionsService.get({
      questionId: $stateParams.questionId
    }).$promise;
  }

  newQuestion.$inject = ['QuestionsService'];

  function newQuestion(QuestionsService) {
    return new QuestionsService();
  }
}());
