(function () {
  'use strict';

  angular
    .module('home.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/modules/home/client/views/home.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      });
  }
}());
