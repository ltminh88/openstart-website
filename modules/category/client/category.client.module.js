(function (app) {
  'use strict';

  app.registerModule('categorys', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('categorys.admin', ['core.admin']);
  app.registerModule('categorys.admin.routes', ['core.admin.routes']);
  app.registerModule('categorys.services');
  app.registerModule('categorys.routes', ['ui.router', 'core.routes', 'categorys.services']);
}(ApplicationConfiguration));
