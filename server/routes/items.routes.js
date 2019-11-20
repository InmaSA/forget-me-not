const express = require('express')
const router = express.Router()

const Item = require('../models/Item.model')


// CREATE a new item in a list
router.post('/new', (req, res, next) => {
  if(!req.body.itemName) {
    res.status(400).json({message: 'Por favor indica un nombre para el nuevo item'})
  }
  Item.create(req.body)
  .then(theNewItem => res.json(theNewItem))
  .catch(err => {
    res.status(500).json({message: 'Error creando un nuevo item para esta lista'})
  })
})



module.exports = router