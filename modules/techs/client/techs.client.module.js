(function (app) {
  'use strict';

  app.registerModule('techs', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('techs.admin', ['core.admin']);
  app.registerModule('techs.admin.routes', ['core.admin.routes']);
  app.registerModule('techs.services');
  app.registerModule('techs.routes', ['ui.router', 'core.routes', 'techs.services']);
}(ApplicationConfiguration));
