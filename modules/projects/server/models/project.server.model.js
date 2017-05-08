'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Project Schema
 */


var ProjectSchema = new Schema({
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
    productcatergory: {
        type: String,
        default: 'Misc'
    },
    country: {
        type: String
    },
    productlanguage: {
        type: String
    },
    developername: {
        type: String,
        default: '',
        trim: true
    },
    members: [{
        type: Schema.ObjectId,
        ref: 'Member'
    }],
    publishername: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String
    },
    blocks: [{
        title: {
            type: String
        },
        content: {
            type: String
        }
    }],
    media: {
        videos: [{
            type: String
        }],
        slideshow: [{
            type: String
        }],
    },
    pages: [{
        type: Schema.ObjectId,
        ref: 'Page'
    }],
    source: {
        type: String,
        trim: true
    },
    license: {
        type: String
    },
    repository: {
        type: String
    },
    sociallinks: {
        github: {
            type: String
        },
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        patreon: {
            type: String
        },
        kickstarter: {
            type: String
        }
    },
    productType: {
        type: String
    },
    duration: {
        type: Number
    },
    rate: {
        type: Number
    },
    thumbnail: {
        type: String
    },
    thumbnailsmall: {
        type: String
    },
    status: {
        type: Number
    },
    urllink: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        trim: true
    },
    releaseDate: {
        type: Date
    },
    commercial: {
        isCommercial: {
            type: Boolean
        },
        price: {
            type: Number
        },
        pricePackage: {
            type: Number
        },
        commercialType: {
            type: Number
        }
    },
    enable: {
        type: Boolean,
        default: true
    },
    listing: {
        index: {
            type: Number
        },
        featured: {
            type: Boolean,
            default: false
        }
    },
    stats: {
        rate: {
            type: Number,
            default: 0
        },
        rank: {
            type: Number,
            default: 0
        },
        lastRank: {
            type: Number,
            default: 0
        },
        rankChange: {
            type: Number,
            default: 0
        },
        likeNum: {
            type: Number,
            default: 0
        },
        viewNum: {
            type: Number,
            default: 0
        },
        downloadNum: {
            type: Number,
            default: 0
        },
        revenue: {
            type: Number,
            default: 0
        },
        viewByMonth: [{
            month: {
                type: Date
            },
            num: {
                type: Number,
                default: 0
            }
        }],
        downloadByMonth: [{
            month: {
                type: Date
            },
            num: {
                type: Number,
                default: 0
            }
        }],
        revenueByMonth: [{
            month: {
                type: Date
            },
            num: {
                type: Number,
                default: 0
            }
        }]
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

mongoose.model('Project', ProjectSchema);
