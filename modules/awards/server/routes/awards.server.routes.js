'use strict';

/**
 * Module dependencies
 */
var awardsPolicy = require('../policies/awards.server.policy'),
  awards = require('../controllers/awards.server.controller');

module.exports = function (app) {
  // Awards collection routes
  app.route('/api/awards').all(awardsPolicy.isAllowed)
    .get(awards.list)
    .post(awards.create);

  // Single award routes
  app.route('/api/awards/:awardId').all(awardsPolicy.isAllowed)
    .get(awards.read)
    .put(awards.update)
    .delete(awards.delete);

  // Finish by binding the award middleware
  app.param('awardId', awards.awardByID);
};
