'use strict';

/**
 * Module dependencies
 */
var gamesPolicy = require('../policies/category.server.policy'),
  category = require('../controllers/category.server.controller');

module.exports = function (app) {
  // Category collection routes
  app.route('/api/categorys')
    .get(category.list)
    .post(category.create);

  // Single category routes
  app.route('/api/categorys/:categoryId')
    .get(category.read)
    .put(category.update)
    .delete(category.delete);

  // Finish by binding the category middleware
  app.param('categoryId', category.gameCatByID);
};
