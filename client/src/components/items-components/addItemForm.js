import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ItemServices from '../../services/item.services'

const itemServices = new ItemServices()


class addItemForm extends Component {
  constructor() {
    super()
    this.state = {
      itemName: '',
      description: '',
      quantity: null,
      date: null // me falta meter el campo de date en el formulario
    }
  }

  handleInputChange = e => {
    const {name, value} = e.target
    this.setState({[name] : value})
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const {itemName, description, quantity, date} = this.state
    // coger el id de la lista al que va a pertenecer este item

    this.props.createNewItem({itemName, description, quantity, date})
  }

  render() {

    return (
      <div className="container">
        <div className="row justify-content-center">
          <form className="col-4" onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <div>
                <small>{this.props.errors.error}</small>
              </div>
              <label htmlFor="itemName">Nombre</label>
              <input type="text" className="form-control" id="itemName" name="itemName" 
              value={this.state.itemName} onChange={this.handleInputChange}></input>
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <input type="text" className="form-control" id="description" name="description" 
              value={this.state.description} onChange={this.handleInputChange}></input>
            </div>
            <div className="form-group">
              <div>
                <small>{this.props.errors.error}</small>
              </div>
              <label htmlFor="quantity">Nombre</label>
              <input type="number" className="form-control" id="quantity" name="quantity" 
              min="0" max="1000000" value={this.state.description} onChange={this.handleInputChange}></input>
            </div>

            <button type="submit" className="btn btn-primary">Añadir</button>
          </form>
        </div>
      </div>
    )
  }  
}


addItemForm.propTypes = {
  lists: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  lists: state.lists,
  errors: state.errors
})

const mapDispatchToProps = dispatch => {
  return {
    createNewItem(itemData) {
      itemServices.addItem(itemData)
      .then(response => {
        dispatch(
          {type:'NEW_ITEM', payload: response.data}
        )
      })
      .catch(err => {
        dispatch(
          {type: 'GET_ERRORS', payload: err.response.data.message}
        )
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (addItemForm)