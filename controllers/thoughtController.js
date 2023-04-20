const { Thought, User, Reaction } = require("../models");

const thoughtController = {
  // Gets all thoughts in the database
  getThoughts(req, res) {
    Thought.find()

      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Gets a thought by using a given thought id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this Id found in database." });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // creates a new thought using a JSON body as input
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        console.log(dbUserData);
        res.json({ message: "Thought has been created." });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Updates a thought by using a JSON body as input
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this Id found in database." });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Deletes a thought using a given thought id
  deleteThought({
    params
}, res) {
    Thought.findOneAndDelete({
            _id: params.thoughtId
        })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({
                    message: "No thought with this Id found in database."
                });
            }
            return User.findOneAndUpdate({
                thoughts: params.thoughtId
            }, {
                $pull: {
                    thoughts: params.thoughtId
                }
            }, {
                new: true
            });
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: "Thought has been deleted"
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
},

  // Adds a reaction to a thought using a JSON body as input
  addReaction({ params, body}, res) {
    Thought.findOneAndUpdate({
            _id: params.thoughtId
        }, {
            $push: {
                reactions: body
            }
        }, {
            new: true,
            runValidators: true
        })
        .then(updatedThought => {
            if (!updatedThought) {
                res.status(404).json({
                    message: 'No reaction found with this id!'
                });
                return;
            }
            res.json(updatedThought);
        })
        .catch(err => res.json(err));
},
  // Removes a reaction using a given thought id and reaction id
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this Id found in database." });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
