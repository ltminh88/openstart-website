(function () {
  'use strict';

  // Configuring the Advertisments Admin module
  angular
    .module('advertisments.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Advertisments',
      state: 'admin.advertisments.list'
    });
  }
}());
