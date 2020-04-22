// Express docs: http://expressjs.com/en/api.html
const express = require('express')

// pull in Mongoose model for uploads
const Upload = require('../models/upload')
const s3Delete = require('../../lib/s3Delete')
const s3Upload = require('../../lib/s3Upload')

// require multer
const multer = require('multer')
const upload = multer({
  dest: 'uploads/'
})

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// require in custom errors
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404

// Create route
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

// INDEX route
router.get('/uploads', (req, res, next) => {
  Upload.find()
    .then(uploads => {
      return uploads.map(upload => upload.toObject())
    })
    // respond with status 200 and JSON of the uploads
    .then(uploads => res.status(200).json({ uploads: uploads }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// UPDATE route
router.patch('/uploads/:id', upload.single('image'), (req, res, next) => {
  // delete req.body.upload.owner
  s3Upload(req.file)
    .then((data) => {
      return Upload.findById(req.params.id)
    })
    .then(handle404)
    .then(upload => {
      // requireOwnership(req, upload)
      upload.updateOne(req.body.upload)
      return upload
    })
    .then(upload => {
      res.status(200).json({
        upload: upload.toObject()
      })
    })
    .catch(next)
})

// DELETE route
router.delete('/uploads/:id', (req, res, next) => {
  // delete req.body.upload.owner
  s3Delete(req.body.title)
    .then((data) => {
      return Upload.findById(req.params.id)
    })
    .then(handle404)
    .then(upload => {
      // requireOwnership(req, upload)
      upload.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
