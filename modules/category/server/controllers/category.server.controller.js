'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  GameCat = mongoose.model('GameCategory'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an category
 */
exports.create = function (req, res) {
  var category = new GameCat(req.body);
  category.user = req.user;

  category.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(category);
    }
  });
};

/**
 * Show the current category
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var category = req.category ? req.category.toJSON() : {};
  res.json(category);
};

/**
 * Update an category
 */
exports.update = function (req, res) {
  var category = req.category;

  category.title = req.body.title;
  category.name = req.body.name;
  //Images
  category.thumbnail = req.body.thumbnail;

  category.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(category);
    }
  });
};

/**
 * Delete an category
 */
exports.delete = function (req, res) {
  var category = req.category;

  category.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(category);
    }
  });
};

/**
 * List of Games
 */
exports.list = function (req, res) {
  GameCat.find().sort('-created').populate('user', 'displayName').exec(function (err, games) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(games);
    }
  });
};

exports.listOfCat = function (req, res){

};

exports.listByName = function (req, res){

};

exports.listByNameAlphabet = function (req, res){

};

/**
 * GameCat middleware
 */
exports.gameCatByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'GameCat is invalid'
    });
  }

  GameCat.findById(id).populate('user', 'displayName').exec(function (err, category) {
    if (err) {
      return next(err);
    } else if (!category) {
      return res.status(404).send({
        message: 'No category with that identifier has been found'
      });
    }
    req.category = category;
    next();
  });
};
