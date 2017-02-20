const express = require('express')
const router = express.Router()
// const videoController = require('../controllers/video_controller')

router.get('/:id', function (req, res) {
  res.render('videos/show', {videoId: req.params.id})
})

// /:id/comments

module.exports = router

//
