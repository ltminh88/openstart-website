(function (app) {
  'use strict';

  app.registerModule('awards', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('awards.admin', ['core.admin']);
  app.registerModule('awards.admin.routes', ['core.admin.routes']);
  app.registerModule('awards.services');
  app.registerModule('awards.routes', ['ui.router', 'core.routes', 'awards.services']);
}(ApplicationConfiguration));
