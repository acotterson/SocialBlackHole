const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userID
router
  .route("/:userID")
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userID/friends
router
  .route("/:userID/friends")
  .post(addFriend)

// /api/users/:userID/friends/:friendID
router
.route("/:userID/friends/:friendID")
.delete(removeFriend);

module.exports = router;
