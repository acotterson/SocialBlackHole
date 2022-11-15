const { User, Thought } = require("../models");

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .then((users) => {
        const userObj = {
          users,
        };
        res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //   get one user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userID })
      // .populate({
      //   path: "friends",
      //   select: "-__v",
      // })
      .select("-__v")
      .then((user) => {
        // if (!user) {
        //   res.status(404).json({ message: "No user with that ID" });
        //   return;
        // }
        // res.json(user);
        // })
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //   create a user
  createUser({ body }, res) {
    User.create(body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err.message);
      });
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //   delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userID })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID exists." })
          : Thought.deleteMany({ _id: { $in: user.thoughts } }).then(() =>
              res.json({ message: "User and thoughts successfully deleted." })
            )
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // add a friend to a user
  addFriend(req, res) {
    console.log("Your friend is being added");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $addToSet: { friends: req.params.friendID } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // remove a friend from a user
  removeFriend(req, res) {
    console.log(req.params);
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $pull: { friends:  req.params.friendID  } },
      { safe: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
