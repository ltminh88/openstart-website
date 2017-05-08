'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Page = mongoose.model('Page'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an page
 */
exports.create = function (req, res) {
  var page = new Page(req.body);
  page.user = req.user;

  page.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(page);
    }
  });
};

/**
 * Show the current page
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var page = req.page ? req.page.toJSON() : {};

  // Add a custom field to the Page, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Page model.
  page.isCurrentUserOwner = !!(req.user && page.user && page.user._id.toString() === req.user._id.toString());

  res.json(page);
};

/**
 * Update an page
 */
exports.update = function (req, res) {
  var page = req.page;

  page.title = req.body.title;
  page.content = req.body.content;

  page.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(page);
    }
  });
};

/**
 * Delete an page
 */
exports.delete = function (req, res) {
  var page = req.page;

  page.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(page);
    }
  });
};

/**
 * List of Pages
 */
exports.list = function (req, res) {
  Page.find().sort('-created').populate('user', 'displayName').exec(function (err, pages) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(pages);
    }
  });
};

/**
 * Page middleware
 */
exports.pageByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Page is invalid'
    });
  }

  Page.findById(id).populate('user', 'displayName').exec(function (err, page) {
    if (err) {
      return next(err);
    } else if (!page) {
      return res.status(404).send({
        message: 'No page with that identifier has been found'
      });
    }
    req.page = page;
    next();
  });
};
