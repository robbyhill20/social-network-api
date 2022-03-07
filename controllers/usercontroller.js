const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },

    getOneUser(req, res) {
        User.findOne({_id: req.params.userId})
            .select('-__v')
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User not found at this ID'})
                    return;
                }
                res.json(user)
            })
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
          .then((newUser) => res.json(newUser))
          .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((updatedUser) => {
                if (!updatedUser) {
                    res.status(404).json({ message: 'User not found at this ID'})
                    return;
                }
                res.json(updatedUser)
            })
            .catch((err) => res.status(500).json(err));
    },

deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) => {
                if (!user) {
           res.status(404).json({ message: 'User not found at this ID' })
                    return;
             }
                res.status(200).json({ message: `User with id: ${req.params.userId} has been deleted!` })
            })
            .catch((err) => res.status(500).json(err));

    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body }},
            { runValidators: true, new: true}
        )
            .then((friend) => {
                if (!friend) {
                    res.status(400).json({ message: 'User not found at this ID' })
                    return;
                }
                res.status(201).json(friend)
            })
            .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
       User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then((friend) => {
            if (!friend) {
                res.status(400).json({ message: 'User not found at this ID' })
                return;
            }
            res.status(200).json(friend)
        })
        .catch((err) => res.status(500).json(err));
    }
};