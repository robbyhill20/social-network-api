const { Thought, User } = require('../models');

module.exports = {
    // find all thougts
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
    // find one thought based on id
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'Thought with provided Id does not exist!'})
                    return;
                }
                res.json(thought)    
            })
            .catch((err) => res.status(500).json(err))
    },
    // create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                // Push the thought to user's thoughts list
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    // $addToSet adds a value to an array unless the value is already present
                    { $addToSet: { thoughts: thought._id}},
                    // new: true show the changes
                    { new: true }
                )
            })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'Thought is created! But user with the provided Id does not exist!' })
                    return;
                }
                res.status(200).json('Thought has been created!')
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // finds one thought and update it
    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) => {
              if (!thought) {
                res.status(404).json({ message: 'Thought with provided Id does not exist!'})
                return;  
              }
              res.json(thought)
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    // remove a thought by its id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'Thought with provided Id does not exist!' })
                    return;
                }
                // remove that thought from user's thought list
                return User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId }},
                    { new: true }
                )
            })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'Thought is deleted! But user with the provided Id does not exist!' })
                    return;
                }
                res.status(200).json('Thought has been deleted successfully!')

            })
            .catch((err) => res.status(500).json(err));
    },
    // Add a thought reaction
    addThoughtReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
        )
        .then((thought) => {        
            if (!thought) {
                res.status(404).json({ message: 'Thought with provided Id does not exist!'})
                return;
            }
            res.json(thought) 
        })
        .catch((err) => res.status(500).json(err));
    },
    // delete a reaction and pull it from reaction list
    deleteThoughtReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) => {
          if (!thought) {
            res.status(404).json({ message: 'provided Id does not exist!'})
            return;  
          }
          res.json(thought)
          })
          .catch((err) => res.status(500).json(err));
      },
}