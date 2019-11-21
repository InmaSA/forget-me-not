import axios from 'axios'

export default class ListServices {
  constructor() {

      this.service = axios.create({
        baseURL: `${process.env.REACT_APP_URL}`,
        withCredentials: true
      })
  }

  addList = ({listName, user_id}) => this.service.post('/lists/new', { listName, user_id })
  getAllLists = (user_id) => this.service.get(`/lists/all?user_id=${user_id}`)
  getOneList = (_id) => this.service.get(`/lists/one?_id=${_id}`)

  
}  