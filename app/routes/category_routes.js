// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Category = require('../models/category')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /examples
router.get('/categories', requireToken, (req, res, next) => {
  req.body.category = {text: req.body.newInterest}
  req.body.category.owner = req.user.id

  Category.find()
    .then(categories => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return categories.map(category => category.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(categories => res.status(200).json({ categories: categories }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/categories/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Category.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(category => res.status(200).json({ category: category.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /examples
router.post('/categories', requireToken, (req, res, next) => {
  // set owner of new example to be current user
  req.body.category = {text: req.body.newInterest}
  req.body.category.owner = req.user.id

  Category.create(req.body.category)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(category => {
      res.status(201).json({ category: category.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/categories/:id', requireToken, removeBlanks, (req, res, next) => {
  req.body.category = {text: req.body.newInterest}
  req.body.category.owner = req.user.id

  delete req.body.category.owner

  Category.findById(req.params.id)
    .then(handle404)
    .then(category => {
      requireOwnership(req, category)
      return category.updateOne(req.body.category)
    })
    .then(category => {
      category.text = req.body.text
      return category
    })
    .then(category => {
      res.sendStatus(200)
    })
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/categories/:id', requireToken, (req, res, next) => {
  req.body.category = {text: req.body.newInterest}
  req.body.category.owner = req.user.id
  Category.findById(req.params.id)
    .then(handle404)
    .then(category => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, category)
      // delete the example ONLY IF the above didn't throw
      category.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
