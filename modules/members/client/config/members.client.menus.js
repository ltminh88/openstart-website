(function () {
  'use strict';

  angular
    .module('members')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Members',
      state: 'members',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'members', {
      title: 'List Members',
      state: 'members.list',
      roles: ['*']
    });
  }
}());
