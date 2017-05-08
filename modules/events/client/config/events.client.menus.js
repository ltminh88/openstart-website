(function () {
  'use strict';

  angular
    .module('events')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Events',
      state: 'events',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'events', {
      title: 'List Events',
      state: 'events.list',
      roles: ['*']
    });
  }
}());
