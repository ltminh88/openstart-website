(function (app) {
  'use strict';

  app.registerModule('advertisments', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('advertisments.admin', ['core.admin']);
  app.registerModule('advertisments.admin.routes', ['core.admin.routes']);
  app.registerModule('advertisments.services');
  app.registerModule('advertisments.routes', ['ui.router', 'core.routes', 'advertisments.services']);
}(ApplicationConfiguration));
