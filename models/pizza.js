const { Schema, model } = require('mongoose');
const moment = require('moment');

const PizzaSchema = new Schema(
    {
      pizzaName: {
        type: String
      },
      createdBy: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      },
      size: {
        type: String,
        default: 'Large'
      },
      toppings: [],
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment'
        }
      ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const Pizza = require('./Pizza');
const Comment = require('./Comment');

module.exports = { Pizza, Comment };