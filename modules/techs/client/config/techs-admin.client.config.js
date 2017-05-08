(function () {
  'use strict';

  // Configuring the Techs Admin module
  angular
    .module('techs.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Techs',
      state: 'admin.techs.list'
    });
  }
}());
