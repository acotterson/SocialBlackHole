const { Thought, User } = require("../models");

module.exports = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      // .populate({
      //   path: "reactions",
      //   select: "-__v",
      // })
      // .select("-__v")
      .sort({ _id: -1 })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //   get one thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtID })
      // .populate({
      //   path: "reactions",
      //   select: "-__v",
      // })
      // .select("-__v")
      .then((thought) => {
        //   if (!thought) {
        //     res.status(404).json({ message: "No thought with that ID" });
        //     return;
        //   }
        //   res.json(thought);
        // })
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //   create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        console.log(thought._id);
        console.log(req.body.userId);
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true, runValidators: true }
        );
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No thought with that ID" });
          return;
        }
        res.json(user);
      })
      // res.json(thought))
      .catch((err) => res.status(500).json(err.message));
  },
  // delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtID })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID exists." })
          : User.findOneAndUpdate(
              { username: thought.username },
              { $pull: { thoughts:  req.params.thoughtID } },
              { new: true }
            )
              .then((user) =>
                !user
                  ? res.status(404).json({
                      message:
                        "Thought deleted, but no user found with that ID :(",
                    })
                  : console.log(user)
              )
              .then(() =>
                res.json({ message: "Thought successfully deleted." })
              )
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // add a reaction to a thought
  addReaction(req, res) {
    console.log("Your reaction is being added");
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // remove a reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      { $pull: { reactions: { reactionID: req.params.reactionID } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought with that ID exists." })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
