const express = require('express')
const router = express.Router()

const List = require('../models/List.model')

// GET all user's lists
router.get('/:user_id', (req, res, next) => {
  const {user_id} = req.params
  List.find({user_id})
  .then(allLists => res.json(allLists))
  .catch(err => {
    res.status(500).json({message: 'Error obteniendo las listas del usuario'})
  })
})

// CREATE a new list
router.post('/new', (req, res, next) => {
  if(!req.body.listName) {
    res.status(400).json({message: 'Por favor indica un nombre para la nueva lista'})
  }
  List.create(req.body)
  .then(theNewList => res.json(theNewList))
  .catch(err => {
    res.status(500).json({message: 'Error creando nueva lista'})
  })
})


// // DELETE a list
// router.get('/delete', (req, res, next) => {
//   // el id me llegará por params
//   List.findByIdAndDelete(id)

// })

// // UPDATE a list
// router.get('/update', (req, res, next) => {
//   // el id me llegará por params y el nuevo name
//   List.findByIdAndUpdate(id, {name})
// })

module.exports = router