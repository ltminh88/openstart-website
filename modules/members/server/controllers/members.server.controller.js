'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Member = mongoose.model('Member'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an member
 */
exports.create = function(req, res) {
  var member = new Member(req.body);
  member.user = req.user;

  member.save(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(member);
    }
  });
};

/**
 * Show the current member
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var member = req.member ? req.member.toJSON() : {};

  // Add a custom field to the Member, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Member model.
  member.isCurrentUserOwner = !!(req.user && member.user && member.user._id.toString() === req.user._id.toString());

  res.json(member);
};

/**
 * Update an member
 */
exports.update = function(req, res) {
  var member = req.member;

  member.title = req.body.title;
  member.content = req.body.content;

  member.save(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(member);
    }
  });
};

/**
 * Delete an member
 */
exports.delete = function(req, res) {
  var member = req.member;

  member.remove(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(member);
    }
  });
};

/**
 * List of Members
 */
exports.list = function(req, res) {
  Member.find().sort('-created').populate('user', 'displayName').exec(function(err, members) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var members = [{
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }, {
        id: "",
        name: "",
        url: "",
        avatar: "",
        rate: "",
        description: "",
        registeredTime: ""
      }];
      res.json(members);
    }
  });
};

/**
 * Member middleware
 */
exports.memberByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Member is invalid'
    });
  }

  Member.findById(id).populate('user', 'displayName').exec(function(err, member) {
    if (err) {
      return next(err);
    } else if (!member) {
      return res.status(404).send({
        message: 'No member with that identifier has been found'
      });
    }
    req.member = member;
    next();
  });
};