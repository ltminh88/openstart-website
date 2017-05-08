(function (app) {
  'use strict';

  app.registerModule('products', ['core', 'ui.select']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('products.admin', ['core.admin', 'ui.select']);
  app.registerModule('products.admin.routes', ['core.admin.routes']);
  app.registerModule('products.services');
  app.registerModule('products.routes', ['ui.router', 'core.routes', 'products.services']);
}(ApplicationConfiguration));
