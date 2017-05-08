'use strict';

/**
 * Module dependencies
 */
var techsPolicy = require('../policies/techs.server.policy'),
  techs = require('../controllers/techs.server.controller');

module.exports = function (app) {
  // Techs collection routes
  app.route('/api/techs').all(techsPolicy.isAllowed)
    .get(techs.list)
    .post(techs.create);

  // Single tech routes
  app.route('/api/techs/:techId').all(techsPolicy.isAllowed)
    .get(techs.read)
    .put(techs.update)
    .delete(techs.delete);

  // Finish by binding the tech middleware
  app.param('techId', techs.techByID);
};
