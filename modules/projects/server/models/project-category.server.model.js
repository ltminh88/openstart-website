'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * ProjectCategory Schema
 */


var ProjectCategorySchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  name: {
    type: String,
    default: '',
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  thumbnail: {
    type: String
  }, 
  slug: {
    type: String
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('ProjectCategory', ProjectCategorySchema);