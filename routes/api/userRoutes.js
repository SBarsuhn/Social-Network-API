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

router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

router.route("/:userId/friend").post(addFriend);

router.route("/:userId/friend/:friendId").delete(removeFriend);

module.exports = router;
