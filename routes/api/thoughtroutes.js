const router = require('express').Router();

const {
   getAllThought,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    deleteThoughtReaction,
 
} = require('../../controllers/thoughtController')
router.route('/:thoughtId/reactions')
    .post(addThoughtReaction)

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteThoughtReaction)
router.route('/')
    .get(getAllThought)
    .post(createThought);

router.route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought)



module.exports = router;
