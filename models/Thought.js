const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtInfo = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Thougts are Required',
      //length between 1 and 280
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      //default date
      default: Date.now,
     //getter method
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);
//creating virtual per readme file


thoughtInfo.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
