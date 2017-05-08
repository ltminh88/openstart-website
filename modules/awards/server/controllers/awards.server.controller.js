'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Award = mongoose.model('Award'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an award
 */
exports.create = function (req, res) {
  var award = new Award(req.body);
  award.user = req.user;

  award.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(award);
    }
  });
};

/**
 * Show the current award
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var award = req.award ? req.award.toJSON() : {};

  // Add a custom field to the Award, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Award model.
  award.isCurrentUserOwner = !!(req.user && award.user && award.user._id.toString() === req.user._id.toString());

  res.json(award);
};

/**
 * Update an award
 */
exports.update = function (req, res) {
  var award = req.award;

  award.title = req.body.title;
  award.content = req.body.content;

  award.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(award);
    }
  });
};

/**
 * Delete an award
 */
exports.delete = function (req, res) {
  var award = req.award;

  award.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(award);
    }
  });
};

/**
 * List of Awards
 */
exports.list = function (req, res) {
  Award.find().sort('-created').populate('user', 'displayName').exec(function (err, awards) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(awards);
    }
  });
};

/**
 * Award middleware
 */
exports.awardByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Award is invalid'
    });
  }

  Award.findById(id).populate('user', 'displayName').exec(function (err, award) {
    if (err) {
      return next(err);
    } else if (!award) {
      return res.status(404).send({
        message: 'No award with that identifier has been found'
      });
    }
    req.award = award;
    next();
  });
};
