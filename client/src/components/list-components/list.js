import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import ListServices from '../../services/list.services'
import ItemServices from '../../services/item.services'

const itemServices = new ItemServices()
const listServices = new ListServices()

class List extends Component {
  constructor() {
    super()
    this.state= {
      addItemsPath: ''
    }
  }

  componentDidMount() {
    const url = this.props.match.url
    const list_id = url.slice(-24)
    this.setState({addItemsPath: `add-items/${list_id}`})
   
    this.props.getThisListName(list_id)
    this.props.getAlltheItems(list_id)
  }


  render() {

    const items = this.props.items.items
    console.log(items)

    if(items === null || items.length === 0) {
      return (
        <>
          <h5>"{this.props.lists.thisList.listName}" está vacía</h5>
          <Link to={this.state.addItemsPath}>Añadir items</Link>
        </>
      )
    }
    return (
      <>
        <h5>{this.props.lists.thisList.listName}:</h5>
        {
          items.map(elm => 
            <div key={elm._id}>
              <p>{elm.itemName}</p>
              <p>{elm.description}</p>
              <p>{elm.quantity}</p>
              <p>{elm.date}</p>
            </div>
          )
        }
        <Link to={this.state.addItemsPath}>Añadir más items</Link>
      </>
    )
  }
}

List.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  lists: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  lists: state.lists,
  items: state.items
})

const mapDispatchToProps = dispatch => {
  return {
    getThisListName(list_id) {
      listServices.getOneList(list_id)
      .then(response => {
        dispatch(
          {type: 'FIND_THIS_LIST', payload: response.data}
        )
      })
      .catch(err => {
        dispatch(
          {type: 'GET_ERRORS', payload: err.response.data.message}
        )
        console.log(err.response.data.message)
        })  
    },

    getAlltheItems(list_id) {
      itemServices.getAllItems(list_id)
      .then(response => {
        dispatch(
          {type:'GET_ITEMS_IN_LIST', payload: response.data},
        )
      })
      .catch(err => {
        dispatch(
          {type: 'GET_ERRORS', payload: err.response.data.message}
        )
        console.log(err.response.data.message)
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (List)
