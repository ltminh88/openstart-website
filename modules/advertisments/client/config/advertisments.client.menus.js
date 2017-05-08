(function () {
  'use strict';

  angular
    .module('advertisments')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    /*
    menuService.addMenuItem('topbar', {
      title: 'Advertisments',
      state: 'advertisments',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'advertisments', {
      title: 'List Advertisments',
      state: 'advertisments.list',
      roles: ['*']
    });
    */
  }
}());
