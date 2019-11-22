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


// GET items of a list
router.get('/view/:list_id', (req,res,next) => {
  const {list_id} = req.params

  Item.find({list_id})
  // .populate('list_id')
  .then(listAndItems => res.json(listAndItems))
  .catch(err => {
    res.status(500).json({message: 'Error obteniendo los items de esta lista'})
  })  
})

// POST a change in checked field
router.get('/edit/:_id', (req,res,next) => {
  console.log("hola!!!!!!")
  Item.findByIdAndUpdate(req.params._id, {checked: !checked}, { new: true })
  .then(editedItem => console.log(editedItem))
})



module.exports = router