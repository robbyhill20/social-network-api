const router = require('express').Router();
const {
  getAll,
  getOne,
  createUser,
  updateUser,
  deleteUser,
  friendAdd,
  unFriend,
} = require('../../controllers/user-controller');

router.route('/').get(getAll).post(createUser);
router.route('/:userId').get(getOne).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(friendAdd).delete(unFriend);

module.exports = router;
