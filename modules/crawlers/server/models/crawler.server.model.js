'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Crawler Schema
 */
var CrawlerSchema = new Schema({
  index : {
    type: Number
  },
  status : {
    type: Number
  },
  params : {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  lastRun: {
    type: Date
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Crawler', CrawlerSchema);
