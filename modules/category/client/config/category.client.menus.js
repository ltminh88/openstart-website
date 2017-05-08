(function () {
  'use strict';

  angular
    .module('categorys')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'games', {
      title: 'List Game category',
      state: 'categorys.list',
      roles: ['*']
    });
  }
}());
