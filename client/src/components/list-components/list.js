import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import ListServices from '../../services/list.services'
import ItemServices from '../../services/item.services'

import Modal from 'react-bootstrap/Modal'
import AddItemForm from '../items-components/addItemForm'

const itemServices = new ItemServices()
const listServices = new ListServices()

class List extends Component {
  constructor() {
    super()
    this.state= {
      showModal: false,
      checked: false
    }
  }

  componentDidMount() {
    const url = this.props.match.url
    const list_id = url.slice(-24)
   
    this.props.getThisListName(list_id)
    this.props.getAlltheItems(list_id)
  }

  handleModalOpen = (e) => this.setState({ showModal: true })
  handleModalClose = (e) => this.setState({ showModal: false })

  handleCheckedField(e) {
    console.log(e.target.checked)
    console.log(e.target.name)

    this.props.changeCheckedField(e.target.name)

  }


  render() {

    const items = this.props.items.items

    if(items === null || items.length === 0) {
      return (
        <>
          <h4>"{this.props.lists.thisList.listName}" está vacía</h4>
          <Link to="#" onClick={this.handleModalOpen} > Añadir items</Link>

          <Modal show={this.state.showModal} onHide={this.handleModalClose}>
            <AddItemForm list_id={this.props.lists.thisList._id}  closeModal={this.handleModalClose}/>
          </Modal>
        </>
      )
    }
    return (
      <>
        <h4>{this.props.lists.thisList.listName}:</h4>
        <section>
          <div className="flex">
            <h5>Item</h5>
            <h5>Description</h5>
            <h5>Quantity</h5>
            <h5>Date</h5>
            <h5>Checked</h5>
            <button type="submit" className="btn btn-primary">Borrar todo</button>
          </div>
          {
            items.map(elm => 
              <div className="flex" key={elm._id}>
                <p>{elm.itemName}</p>
                <p>{elm.description}</p>
                <p>{elm.quantity}</p>
                <p>{elm.date}</p>
                <form>
                  <input name={elm._id} type="checkbox" checked={elm.checked} onChange={this.handleCheckedField}></input>
                </form>
                <button type="submit" className="btn btn-primary">Borrar</button>
              </div>
            )
          }
        </section>
        <Link to="#" onClick={this.handleModalOpen} > Añadir items</Link>

        <Modal show={this.state.showModal} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>¿Qué quieres añadir?:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddItemForm list_id={this.props.lists.thisList._id} closeModal={this.handleModalClose}/>
          </Modal.Body>

        </Modal>
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
    },
    changeCheckedField(item_id) {
      itemServices.editChecked(item_id)
      .then(response => {
        dispatch(
          {type:'CHANGE_CHECKED', payload: response.data},
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
