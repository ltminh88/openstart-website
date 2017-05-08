(function (app) {
  'use strict';

  app.registerModule('projects', ['core', 'ui.select']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('projects.admin', ['core.admin', 'ui.select']);
  app.registerModule('projects.admin.routes', ['core.admin.routes']);
  app.registerModule('projects.services');
  app.registerModule('projects.routes', ['ui.router', 'core.routes', 'projects.services']);
}(ApplicationConfiguration));
