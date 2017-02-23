const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment_controller')

var isNotLoggedIn = require('../middleware/isNotLoggedIn')

router.get('/:id', isNotLoggedIn, commentController.show)

router.post('/:id', commentController.create)

router.put('/:id', commentController.edit)

router.put('/:id/upvote', commentController.increment)

router.delete('/:id', commentController.delete)

module.exports = router
