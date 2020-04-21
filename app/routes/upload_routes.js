// Express docs: http://expressjs.com/en/api.html
const express = require('express')

// pull in Mongoose model for uploads
const Upload = require('../models/upload')

const s3Upload = require('../../lib/s3Upload')

// require multer
const multer = require('multer')
const upload = multer({
  dest: 'uploads/'
})

// instantiate a router (mini app that only handles routes)
const router = express.Router()

router.post('/uploads', upload.single('image'), (req, res) => {
  // const title = req.body.title
  // console.log(req.file.originalname)
  s3Upload(req.file)
    .then((data) => {
      return Upload.create({
        title: req.file.originalname,
        imageUrl: data.Location
      })
    })
    .then(upload => res.status(201).json({
      upload: upload.toObject()
    }))
    .catch(console.error)
})

module.exports = router
