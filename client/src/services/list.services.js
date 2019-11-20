import axios from 'axios'

export default class AuthServices {
  constructor() {

      this.service = axios.create({
        baseURL: `${process.env.REACT_APP_URL}`,
        withCredentials: true
      })
  }

  addList = ({listName, user_id}) => this.service.post('/lists/new', { listName, user_id })
  getAllLists = (user_id) => this.service.get(`/lists/${user_id}`)

  
}  