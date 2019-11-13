const express = require('express')
const router = express.Router()

const List = require('../models/List.model')

// GET all user's lists
router.get('/', (req, res, next) => {
  List.find()
  // el user_id me tendrá que venir de la sesión
  .populate('user_id')
  .then(allLists => console.log('estas son las listas: ', allLists))
  .catch(err => console.log('Error obteniendo las listas del usuario: ', err))
})

// CREATE a new list
router.post('/new', (req, res, next) => {

})

// DELETE a list
router.get('/delete', (req, res, next) => {
  // el id me llegará por params
  List.findByIdAndDelete(id)

})

// UPDATE a list
router.get('/update', (req, res, next) => {
  // el id me llegará por params y el nuevo name
  List.findByIdAndUpdate(id, {name})
})

module.exports = router