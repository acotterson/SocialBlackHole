const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
  reactionID: {
    type: Schema.Types.ObjectId,
    default: new Schema.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    max_length: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get:(timestamp) => dateFormat(timestamp),
  },
});


// reactionSchema.virtual("")

const Reaction = model("Reaction", reactionSchema);


module.exports = Reaction;
