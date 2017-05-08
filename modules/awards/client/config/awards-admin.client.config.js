(function () {
  'use strict';

  // Configuring the Awards Admin module
  angular
    .module('awards.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Awards',
      state: 'admin.awards.list'
    });
  }
}());
