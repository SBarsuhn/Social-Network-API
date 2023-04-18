const router = require("express").Router();
const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThought).post(createThought);

router.route("/:thoughtId").get(getSingleThought).delete(deleteThought);

router.route("/:thoughtId/reaction").post(addReaction);

router.route("/:thoughtId/reaction/:reactionId").delete(removeReaction);

module.exports = router;
