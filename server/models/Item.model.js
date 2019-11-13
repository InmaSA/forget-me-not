const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema ({
  itemName: {type: String, required:true},
  date: {type: Date, required: false},
  description: {type: String, required: false},
  quantity: {type: Number, required: false},
  checked: {type: Boolean, default: false},
  list_id: {type: Schema.Types.ObjectId, ref: 'List'}
}, {timestamps: true})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item