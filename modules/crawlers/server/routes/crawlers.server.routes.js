'use strict';

/**
 * Module dependencies
 */
var crawlersPolicy = require('../policies/crawlers.server.policy');
var crawlers = require('../controllers/crawlers.server.controller');

module.exports = function (app) {
  // Crawlers collection routes
  app.route('/api/crawlers').all(crawlersPolicy.isAllowed)
    .get(crawlers.list)
    .post(crawlers.create);

  // Single crawler routes
  app.route('/api/crawlers/:crawlerId').all(crawlersPolicy.isAllowed)
    .get(crawlers.read)
    .put(crawlers.update)
    .delete(crawlers.delete);

  app.route('/api/crawlers/run/:crawlerInsId')
    .get(crawlers.runCrawler);
  // Finish by binding the crawler middleware
  app.param('crawlerId', crawlers.crawlerByID);
/*
  app.route('/api/crawlers/save/slideshow')
    .put(crawlers.saveGameSlideshow);
    
  app.route('/api/crawlers/save/thumbnail')
    .put(crawlers.saveGameThumbnail);
  app.route('/api/crawlers/save/mp3')
    .put(crawlers.saveGameMp3);
  app.route('/api/crawlers/save/mp4')
    .put(crawlers.saveGameMp4);
*/
};
