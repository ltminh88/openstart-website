(function () {
  'use strict';

  // Configuring the Members Admin module
  angular
    .module('members.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Members',
      state: 'admin.members.list'
    });
  }
}());
