(function () {
  'use strict';

  angular
    .module('awards')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Awards',
      state: 'awards',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'awards', {
      title: 'List Awards',
      state: 'awards.list',
      roles: ['*']
    });
  }
}());
