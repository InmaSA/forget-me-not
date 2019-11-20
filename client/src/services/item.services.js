import axios from 'axios'

export default class ItemServices {
  constructor() {

      this.service = axios.create({
        baseURL: `${process.env.REACT_APP_URL}`,
        withCredentials: true
      })
  }

  // tengo que meter data y list_id 
  addItem = ({itemName, description, quantity, date}) => this.service.post('/items/new', {itemName, description, quantity, date})

  
}  