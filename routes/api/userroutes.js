const router = require('express').Router();

const {
    getUsers,
    addFriend,
    removeFriend,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
   
} = require('../../controllers/userController')

router.route('/:userId/friends')
    .post(addFriend)   

router.route('/:userId/friends/:friendId')
    .delete(removeFriend)
router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser)



module.exports = router;
