(function () {
  'use strict';

  angular
    .module('techs')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Techs',
      state: 'techs',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'techs', {
      title: 'List Techs',
      state: 'techs.list',
      roles: ['*']
    });
  }
}());
