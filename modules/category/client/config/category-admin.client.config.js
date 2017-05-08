(function () {
  'use strict';

  // Configuring the Category Admin module
  angular
    .module('categorys.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];


  function menuConfig(Menus) {

    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Categorys',
      state: 'admin.categorys.list'
    });
  }
  
}());
