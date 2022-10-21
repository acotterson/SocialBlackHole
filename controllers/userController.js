const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //   get one user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userID })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              user,
              thoughts: await thoughts(req.params.userID),
              friends: await friends(req.params.userID),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //   create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //   delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userID })
      .then(
        (user) =>
          !user
            ? res
                .status(404)
                .json({ message: "No student with that ID exists." })
            : res.json({ message: "User successfully deleted." })
        // Thought.findOneAndRemove(
        //         { username: req.params.userID },
        //       )
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // add a thought to a user
  addFriend(req, res) {
    console.log("Your thought is being added");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // remove a thought from a user
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $pull: { friend: { _id: req.params.userID } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
