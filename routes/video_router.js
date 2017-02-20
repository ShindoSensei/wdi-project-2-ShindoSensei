const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment_controller')

router.get('/:id', function (req, res) {
  res.render('videos/show', {videoId: req.params.id})
})

router.post('/:id', commentController.create)

module.exports = router
