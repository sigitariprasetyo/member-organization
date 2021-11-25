const router = require('express').Router();
const CommentController = require('../controllers/comment')

router.get('/:organization/comments', CommentController.getAll)
router.post('/:organization/comments', CommentController.create)
router.delete('/:organization/comments', CommentController.delete)

module.exports = router