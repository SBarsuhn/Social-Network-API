// These are all of the endpoints for viewing/editing users and friends. the "/" represents "/user"
const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  updateUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getSingleUser).delete(deleteUser).put(updateUser);

router.route("/:userId/friends/:friendId").post(addFriend);

router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;
