import axios from 'axios'

export default class ItemServices {
  constructor() {

      this.service = axios.create({
        baseURL: `${process.env.REACT_APP_URL}`,
        withCredentials: true
      })
  }


  addItem = ({itemName, description, quantity, date, list_id}) => this.service.post('/items/new', {itemName, description, quantity, date, list_id})
  getAllItems = (list_id) => this.service.get(`/items/view/${list_id}`)
  editChecked= (_id) => this.service.get(`/items/edit/${_id}`)
  
}  