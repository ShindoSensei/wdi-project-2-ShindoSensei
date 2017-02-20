const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment_controller')

router.get('/:id', commentController.show)

router.post('/:id', commentController.create)

router.delete('/:id', commentController.delete)

module.exports = router
