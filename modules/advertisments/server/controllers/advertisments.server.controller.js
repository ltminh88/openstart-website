'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Advertisment = mongoose.model('Advertisment'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an advertisment
 */
exports.create = function (req, res) {
  var advertisment = new Advertisment(req.body);
  advertisment.user = req.user;

  advertisment.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(advertisment);
    }
  });
};

/**
 * Show the current advertisment
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var advertisment = req.advertisment ? req.advertisment.toJSON() : {};

  // Add a custom field to the Advertisment, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Advertisment model.
  advertisment.isCurrentUserOwner = !!(req.user && advertisment.user && advertisment.user._id.toString() === req.user._id.toString());

  res.json(advertisment);
};

/**
 * Update an advertisment
 */
exports.update = function (req, res) {
  var advertisment = req.advertisment;

  advertisment.title = req.body.title;
  advertisment.content = req.body.content;

  advertisment.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(advertisment);
    }
  });
};

/**
 * Delete an advertisment
 */
exports.delete = function (req, res) {
  var advertisment = req.advertisment;

  advertisment.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(advertisment);
    }
  });
};

/**
 * List of Advertisments
 */
exports.list = function (req, res) {
  Advertisment.find().sort('-created').populate('user', 'displayName').exec(function (err, advertisments) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(advertisments);
    }
  });
};

/**
 * Advertisment middleware
 */
exports.advertismentByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Advertisment is invalid'
    });
  }

  Advertisment.findById(id).populate('user', 'displayName').exec(function (err, advertisment) {
    if (err) {
      return next(err);
    } else if (!advertisment) {
      return res.status(404).send({
        message: 'No advertisment with that identifier has been found'
      });
    }
    req.advertisment = advertisment;
    next();
  });
};
