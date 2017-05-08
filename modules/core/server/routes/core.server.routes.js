'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');
  //var admin = require('../controllers/core.admin.server.controller');
  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/debug/config/').get(core.debugConfig);
  app.route('/*').get(core.renderIndex);

};
