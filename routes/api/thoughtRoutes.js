const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  updateThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getSingleThought).delete(deleteThought).put(updateThought);

router.route("/:thoughtId/reaction").post(addReaction);

router.route("/:thoughtId/reaction/:reactionId").delete(removeReaction);

module.exports = router;
