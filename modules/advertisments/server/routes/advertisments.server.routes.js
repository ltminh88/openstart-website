'use strict';

/**
 * Module dependencies
 */
var advertismentsPolicy = require('../policies/advertisments.server.policy'),
  advertisments = require('../controllers/advertisments.server.controller');

module.exports = function (app) {
  // Advertisments collection routes
  app.route('/api/advertisments').all(advertismentsPolicy.isAllowed)
    .get(advertisments.list)
    .post(advertisments.create);

  // Single advertisment routes
  app.route('/api/advertisments/:advertismentId').all(advertismentsPolicy.isAllowed)
    .get(advertisments.read)
    .put(advertisments.update)
    .delete(advertisments.delete);

  // Finish by binding the advertisment middleware
  app.param('advertismentId', advertisments.advertismentByID);
};
