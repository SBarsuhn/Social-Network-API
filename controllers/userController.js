const { User } = require("../models");

const userController = {
  // Gets all users in the database
  getUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",

        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")

      .sort({
        _id: -1,
      })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// Gets a user by using a given thought id
  getSingleUser({ params }, res) {
    User.findOne({
      _id: params.id,
    })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
// creates a new user using a JSON body as input
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
// Updates a user by using a JSON body as input
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      {
        _id: params.id,
      },
      body,
      {
        new: true,
        runValidators: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user with this Id found in database." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
// Deletes a user using a given user id
  deleteUser({ params }, res) {
    User.findOneAndDelete({
      _id: params.id,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user with this Id found in database." });
          return;
        }
        return dbUserData;
      })
      .then((dbUserData) => {
        User.updateMany(
          {
            _id: {
              $in: dbUserData.friends,
            },
          },
          {
            $pull: {
              friends: params.userId,
            },
          }
        )
          .then(() => {
            Thought.deleteMany({
              username: dbUserData.username,
            })
              .then(() => {
                res.json({ message: "User has been deleted." });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json(err);
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
// Adds one user to another users friends list by using each user's id
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      {
        _id: params.userId,
      },
      {
        $push: {
          friends: params.friendId,
        },
      },
      {
        new: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user with this Id found in database." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
// Removes one user from another users friends list by using each user's id
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No friend with this Id found in database.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  }
};


module.exports = userController;
