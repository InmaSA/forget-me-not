import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ListServices from '../../services/list.services'

const listServices = new ListServices()


class addListForm extends Component {
  constructor() {
    super()
    this.state = {
      listName: ''
    }
  }

  handleInputChange = e => {
    const {name, value} = e.target
    this.setState({[name] : value})
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const {listName} = this.state
    const user_id = this.props.auth.loggedInUser._id

    this.props.createNewList({listName, user_id}, this.props.history)
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
              <label htmlFor="listName">Nombre</label>
              <input type="text" className="form-control" id="listName" placeholder="Vacaciones, compra, ..."
              name="listName" value={this.state.listName} onChange={this.handleInputChange}></input>
            </div>
            <button type="submit" className="btn btn-primary">Crear</button>
          </form>
        </div>
      </div>
    )
  }  
}


addListForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  lists: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  lists: state.lists
})

const mapDispatchToProps = dispatch => {
  return {
    createNewList(listData, history) {
      listServices.addList(listData)
      .then(response => {
        dispatch(
          {type:'NEW_LIST', payload: response.data}
        )
        history.push('/lists')
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
) (addListForm)