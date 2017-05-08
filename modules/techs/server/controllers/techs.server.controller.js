'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Tech = mongoose.model('Tech'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an tech
 */
exports.create = function (req, res) {
  var tech = new Tech(req.body);
  tech.user = req.user;

  tech.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(tech);
    }
  });
};

/**
 * Show the current tech
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var tech = req.tech ? req.tech.toJSON() : {};

  // Add a custom field to the Tech, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Tech model.
  tech.isCurrentUserOwner = !!(req.user && tech.user && tech.user._id.toString() === req.user._id.toString());

  res.json(tech);
};

/**
 * Update an tech
 */
exports.update = function (req, res) {
  var tech = req.tech;

  tech.title = req.body.title;
  tech.content = req.body.content;

  tech.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(tech);
    }
  });
};

/**
 * Delete an tech
 */
exports.delete = function (req, res) {
  var tech = req.tech;

  tech.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(tech);
    }
  });
};

/**
 * List of Techs
 */
exports.list = function (req, res) {
  Tech.find().sort('-created').populate('user', 'displayName').exec(function (err, techs) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(techs);
    }
  });
};

/**
 * Tech middleware
 */
exports.techByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Tech is invalid'
    });
  }

  Tech.findById(id).populate('user', 'displayName').exec(function (err, tech) {
    if (err) {
      return next(err);
    } else if (!tech) {
      return res.status(404).send({
        message: 'No tech with that identifier has been found'
      });
    }
    req.tech = tech;
    next();
  });
};
