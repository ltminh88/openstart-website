'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * GameCategory Schema
 */


var GameCategorySchema = new Schema({
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
   thumbnail:{
    type: String
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  status : {
    type: Number
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('GameCategory', GameCategorySchema);