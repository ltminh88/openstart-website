(function () {
  'use strict';

  // Configuring the Crawlers Admin module
  angular
    .module('crawlers.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Crawlers',
      state: 'admin.crawlers.list'
    });
  }
}());
