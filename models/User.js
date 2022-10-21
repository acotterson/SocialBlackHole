const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    reactions: [reactionSchema],
    friends: [userSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
